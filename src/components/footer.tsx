import { Logger } from '@bracketed/logger';
import * as cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TurndownService from 'turndown';

const Component: React.FC = () => (
	<div>
		<hr />
		<h1>Contribution & Help</h1>
		Feel free to contribute to this project, join our <a href='https://discord.com/invite/JZ4949cvMT'>discord</a>{' '}
		and help us with future developments of Project Bracketed & Packages by Bracketed Softworks. Please also notify
		us of errors within our projects as we may not be aware of them at the time.
		<br />
		<div style={{ fontWeight: 'bold' }}>
			<h2>Thanks for using our content!</h2>
			<img
				src='https://github.com/Bracketed/Branding/blob/main/Banners/LogoBannerTextMini.png?raw=true'
				alt='Bracketed logo'
				width='900'
				style={{ borderRadius: '25px' }}
			/>
			Bracketed Softworks - <a href='https://bracketed.co.uk'>Website</a> |{' '}
			<a href='https://discord.com/invite/JZ4939cvMT'>Discord</a> |{' '}
			<a href='https://github.com/Bracketed'>Github</a> | <a href='https://x.com/teambracketed'>Twitter</a> |{' '}
			<br />
			<br />
			<img
				src='https://discordapp.com/api/guilds/1041758035355369542/widget.png?style=banner2'
				alt='Discord Banner'
			/>
		</div>
	</div>
);

export const buildFooterMarkdown = () => {
	const Console = new Logger({ prefix: 'React' });

	Console.info(`Building React for ${import.meta.filename}...`);
	const Turndown = new TurndownService();
	const CheerioComponent = cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component />));

	return Turndown.turndown(CheerioComponent.html());
};
