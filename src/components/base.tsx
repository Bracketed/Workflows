import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';

const Component: React.FC = () => (
	<div>
		<h1>@Workflows</h1>
		<hr />
		<h2>Utilities by Bracketed Softworks</h2>
		<br />
		<h2>Bracketed/Workflows</h2>
		<br />
		<p>
			Reusable workflows and actions for use by Bracketed Softworks to Build, publish, create, lint, document and
			more across our various products, projects and services we provide, as well as fast, reusable workflows for
			anyone who'd like to use them! ⚡🎉
			<br />
			We permit usage of these by users outside of the Bracketed Softworks Organisation, these are free to use,
			copy and edit!
		</p>
		<br />
		<p>A few of the actions or workflows used in this repository are forks of `sapphiredev`'s reusables.</p>
		<hr />
		<br />
	</div>
);

export const buildBaseMarkdown = () => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React for ${import.meta.filename}...`);
	const Turndown = new TurndownService();
	const CheerioComponent = cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component />));

	return Turndown.turndown(CheerioComponent.html());
};
