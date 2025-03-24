import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';
import type { FileDataMap } from '../types';

const Component: React.FC<{ data: Array<{ name: string; data: Array<FileDataMap> }> }> = (props: {
	data: Array<{ name: string; data: Array<FileDataMap> }>;
}) => (
	<div>
		<h3>Glossary:</h3>
		{props.data.map((d, ind) => (
			<div key={ind}>
				<h4>{d.name}:</h4>
				<ul>
					{d.data.map((d) => (
						<li>
							<a href={d.content.url}>{d.content.name}</a>
						</li>
					))}
				</ul>
			</div>
		))}
	</div>
);

export const buildGlossaryMarkdown = (...data: Array<{ name: string; data: Array<FileDataMap> }>) => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React Component for Workflow/Actions via ${import.meta.filename}`);
	const Turndown = new TurndownService();
	const CheerioComponent = cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component data={data} />));

	return Turndown.turndown(CheerioComponent.html());
};
