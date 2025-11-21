import type { FileDataMap } from '@/types/index';
import { toAnchorId } from '@/utils/index';
import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import type React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';

const Component: React.FC<{ data: Array<{ name: string; data: Array<FileDataMap> }> }> = (props: {
	data: Array<{ name: string; data: Array<FileDataMap> }>;
}) => (
	<div>
		<h3>Glossary:</h3>
		{props.data.map((d, ind) => (
			<div key={ind}>
				<h4>{d.name}:</h4>
				<ul>
					{d.data.map((d, id) => (
						<li key={id}>
							<a href={`#${toAnchorId(d.content.name)}`}>{d.content.name}</a>
						</li>
					))}
				</ul>
			</div>
		))}
	</div>
);

export const buildGlossaryMarkdown = (...data: Array<{ name: string; data: Array<FileDataMap> }>) => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React Component for Workflow/Actions with ${import.meta.filename}`);
	const Turndown = new TurndownService();
	const CheerioComponent = cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component data={data} />));

	return Turndown.turndown(CheerioComponent.html());
};
