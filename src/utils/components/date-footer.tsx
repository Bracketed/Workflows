import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';
import { getLatestCommitFullHash } from '../getLatestCommitFullHash.js';
import { getLatestCommitHash } from '../getLatestCommitHash.js';
import { getLatestCommitUser } from '../getLatestCommitUser.js';
import { getGitRepo } from '../getRepository.js';

const Component: React.FC = () => (
	<div>
		<hr />
		<i>
			Last Edited by {getLatestCommitUser()} at {new Date().toLocaleDateString()} in{' '}
			<b>
				<a href={`${getGitRepo()}/commit/${getLatestCommitFullHash()}`}>{getLatestCommitHash()}</a>
			</b>
		</i>
	</div>
);

export const buildDateFooterMarkdown = () => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React for ${import.meta.filename}...`);
	const Turndown = new TurndownService();
	const CheerioComponent = cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component />));

	return Turndown.turndown(CheerioComponent.html());
};
