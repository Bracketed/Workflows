import type { FinderItem } from '@/types/index';
import { getGitBranch, getGitRepo, toAnchorId } from '@/utils/index';
import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';

const generateExampleValue = (input: { name: string; values: any }): string => {
	if (input.values.default !== undefined) {
		return String(input.values.default);
	}

	const type = input.values.type ?? 'string';
	if (type === 'boolean') {
		return 'true';
	} else if (type === 'number') {
		return '1';
	} else {
		// Use a GitHub Actions expression for dynamic values
		const varName = input.name.toUpperCase().replace(/-/g, '_');
		return `$\{{ secrets.EXAMPLE_${varName} }}`;
	}
};

const Component: React.FC<FinderItem> = (props: FinderItem) => {
	const repoPath = getGitRepo().replace('.git', '');
	const branch = getGitBranch();

	// Generate workflow example
	const workflowExample = `name: Example Workflow
on:
  push:
    branches: [main]

jobs:
  example:
    uses: ${repoPath}/${props.file}@${branch}${
		props.content.inputs.length > 0
			? `
    with:${props.content.inputs
		.slice(0, 3)
		.map(
			(i) => `
      ${i.name}: ${generateExampleValue(i)}`
		)
		.join('')}`
			: ''
	}`;

	// Generate action example
	const actionExample = `steps:
  - name: ${props.content.name}
    uses: ${repoPath}/${props.dir}@${branch}${
		props.content.inputs.length > 0
			? `
    with:${props.content.inputs
		.slice(0, 3)
		.map(
			(i) => `
      ${i.name}: ${generateExampleValue(i)}`
		)
		.join('')}`
			: ''
	}`;

	return (
		<div>
			<h4 id={toAnchorId(props.content.name)}>
				<a href={`#${toAnchorId(props.content.name)}`}>{props.content.name}</a>
			</h4>
			<ul>
				<li>
					Component link: `{repoPath}/{props.type === 'workflow' ? props.file : props.dir}@{branch}`{' '}
					<a href={props.content.url}>[Source]</a>
				</li>
				<li>Description: {props.content.description}</li>
			</ul>
			{props.content.inputs.length !== 0 ? (
				<div>
					<b>Inputs:</b>
					<ul>
						{props.content.inputs.map((i, ind) => (
							<li key={ind}>
								<b>{i.name}</b>: {i.values.description}
								<ul>
									<li>Required: `{i.values.required ? 'true' : 'false'}`</li>
									{i.values.default ? <li>Default: `{String(i.values.default)}`</li> : undefined}
									<li>Type: `{i.values.type ?? 'string'}`</li>
								</ul>
							</li>
						))}
					</ul>
				</div>
			) : undefined}
			<div>
				<b>Example Usage:</b>
				<pre>
					<code>{props.type === 'workflow' ? workflowExample : actionExample}</code>
				</pre>
			</div>
		</div>
	);
};

export const buildItemMarkdown = (item: FinderItem) => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React Component for ${item.file} (${item.type}) with ${import.meta.filename}`);
	Console.info(`Component info for ${item.file} (${item.type}):`, item);
	const Turndown = new TurndownService();
	const CheerioComponent = cheerio.load(
		ReactDOMServer.renderToStaticMarkup(
			<Component content={item.content} file={item.file} dir={item.dir} type={item.type} />
		)
	);

	return Turndown.turndown(CheerioComponent.html());
};
