import { getGitRepo, getLatestCommitFullHash, getLatestCommitHash, getLatestCommitUser } from '@/utils/index';
import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';

const Component: React.FC = () => (
	<div>
		<hr />
		<i>
			Last Edited by {getLatestCommitUser()} at {new Date().toLocaleDateString('en-GB')} in{' '}
			<b>
				<a href={`${getGitRepo()}/commit/${getLatestCommitFullHash()}`}>{getLatestCommitHash()}</a>
			</b>
		</i>
		<br />
		<p>
			- This repo automatically generates its README.md file, feel free to take a look or use the code in this
			repo!
		</p>
	</div>
);

export const buildDateFooterMarkdown = () => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React for ${import.meta.filename}...`);
	const Turndown = new TurndownService();
	const CheerioComponent = cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component />));

	return Turndown.turndown(CheerioComponent.html());
};
