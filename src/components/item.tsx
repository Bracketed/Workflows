import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';
import type { FinderItem } from '../types';
import { getGitBranch } from '../utils';

const Component: React.FC<FinderItem> = (props: FinderItem) => (
	<div>
		<h4>
			<a href={props.content.url}>{props.content.name}</a>
		</h4>
		<p>
			Component link: `{props.file}@{getGitBranch()}`
		</p>
		<p>- {props.content.description}</p>
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
	</div>
);

export const buildItemMarkdown = (item: FinderItem) => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React Component for Workflow/Actions with ${import.meta.filename}`);
	const Turndown = new TurndownService();
	const CheerioComponent = cheerio.load(
		ReactDOMServer.renderToStaticMarkup(
			<Component
				content={item.content}
				file={item.file}
				dir={item.dir}
			/>
		)
	);

	return Turndown.turndown(CheerioComponent.html());
};
