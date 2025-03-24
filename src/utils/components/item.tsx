import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';
import type { FinderItem } from '../../types/item';

const Component: React.FC<FinderItem> = (props: FinderItem) => (
	<div>
		<h4>
			<a href={props.content.url}>{props.content.name}</a>
		</h4>
		<p>- {props.content.description}</p>
		<b>Inputs:</b>
		<ul>
			{props.content.inputs.map((i) => (
				<li>
					<b>{i.name}</b>: {i.values.description}
					<ul>
						<li>Required: {i.values.required}</li>
						<li>Default: {i.values.default ?? false}</li>
						<li>Type: {i.values.type ?? 'string'}</li>
					</ul>
				</li>
			))}
		</ul>
	</div>
);

export const buildItemMarkdown = (item: FinderItem) => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React Component for Workflow/Actions via ${import.meta.filename}`);
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
