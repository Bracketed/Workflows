/**
	__/\\\______________/\\\__________________________________________________/\\\\\__/\\\\\\_________________________________________________        
	 _\/\\\_____________\/\\\______________________________/\\\______________/\\\///__\////\\\_________________________________________________       
	  _\/\\\_____________\/\\\_____________________________\/\\\_____________/\\\_________\/\\\_________________________________________________      
	   _\//\\\____/\\\____/\\\______/\\\\\_____/\\/\\\\\\\__\/\\\\\\\\_____/\\\\\\\\\______\/\\\________/\\\\\_____/\\____/\\___/\\__/\\\\\\\\\\_     
	    __\//\\\__/\\\\\__/\\\_____/\\\///\\\__\/\\\/////\\\_\/\\\////\\\__\////\\\//_______\/\\\______/\\\///\\\__\/\\\__/\\\\_/\\\_\/\\\//////__    
	     ___\//\\\/\\\/\\\/\\\_____/\\\__\//\\\_\/\\\___\///__\/\\\\\\\\/______\/\\\_________\/\\\_____/\\\__\//\\\_\//\\\/\\\\\/\\\__\/\\\\\\\\\\_   
	      ____\//\\\\\\//\\\\\_____\//\\\__/\\\__\/\\\_________\/\\\///\\\______\/\\\_________\/\\\____\//\\\__/\\\___\//\\\\\/\\\\\___\////////\\\_  
	       _____\//\\\__\//\\\_______\///\\\\\/___\/\\\_________\/\\\_\///\\\____\/\\\_______/\\\\\\\\\__\///\\\\\/_____\//\\\\//\\\_____/\\\\\\\\\\_ 
	        ______\///____\///__________\/////_____\///__________\///____\///_____\///_______\/////////_____\/////________\///__\///_____\//////////__
	
			A Reusable workflows repository by Bracketed Softworks!
			@author ninjaninja140
			@name workflows-updater
*/
console.clear();

import { Logger } from '@bracketed/logger';
import dotenv from 'dotenv';
import promised from 'node:fs/promises';
import { ActionsFinder } from './finder.js';
import { WorkflowCall } from './types/wf_call.js';
import {
	buildBaseMarkdown,
	buildDateFooterMarkdown,
	buildFooterMarkdown,
	buildItemMarkdown,
	buildURL,
	getGitBranch,
	getGitRepo,
	getLatestCommitUser,
	isGithubAction,
	isGithubWorkflow,
	runCommand,
	stripFirst,
} from './utils/index.js';

dotenv.config();

const Console = new Logger({ depth: 6, prefix: 'Main' });
const Finder = new ActionsFinder('../');
const Files = await Finder.load();

const Data = Files.map((a) => {
	let inputs;
	let type;

	if (isGithubAction(a.content)) {
		type = 'action';
		inputs = a.content.inputs;
	}

	if (isGithubWorkflow(a.content)) {
		type = 'workflow';
		const Call: WorkflowCall = Object.values(a.content.on)[0];

		if (!Call) inputs = {};
		else inputs = Call.inputs;
	}

	return {
		type: type,
		file: stripFirst(a.relative).replace(/\\/g, '/'),
		dir: stripFirst(a.directory).replace(/\\/g, '/'),
		content: {
			name: a.content.name,
			url: buildURL(stripFirst(a.relative).replace(/\\/g, '/')),
			description: a.content.description,
			inputs: inputs ?? {},
		},
	};
});

const Workflows = Data.filter((a) => a.type === 'workflow')
	.map((a) => ({
		file: a.file,
		dir: a.dir,
		content: {
			...a.content,
			inputs: Object.entries(a.content.inputs).map(([key, value]) => ({
				name: key,
				values: value,
			})),
		},
	}))
	.map((a) => ({
		...a,
		markdown: buildItemMarkdown(a),
	}));

const Actions = Data.filter((a) => a.type === 'action')
	.map((a) => ({
		file: a.file,
		dir: a.dir,
		content: {
			...a.content,
			inputs: Object.entries(a.content.inputs).map(([key, value]) => ({
				name: key,
				values: value,
			})),
		},
	}))
	.map((a) => ({
		...a,
		markdown: buildItemMarkdown(a),
	}));

Console.info('Building React & Markdown...');
const Content: Array<string> = [
	buildBaseMarkdown(),
	'## Workflows:',
	...Workflows.map((w) => w.markdown),
	'\n\n',
	'## Actions:',
	...Actions.map((w) => w.markdown),
	buildDateFooterMarkdown(),
	buildFooterMarkdown(),
];

Console.info('Build & Organised React Components!');

await promised.writeFile('./README.md', Content.join('\n'), { encoding: 'utf8' });
Console.info('Saved new documentation data!');

runCommand('git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"');
runCommand('git config --global user.name "github-actions[bot]"');

runCommand(
	`git commit -a -m "Update README.md from Publish Container - ${getLatestCommitUser()} ${new Date().toLocaleDateString()}"`
);

runCommand(`git push https://x-access-token:${process.env.GH_TOKEN}@github.com/${getGitRepo()}.git ${getGitBranch()}`);

process.exit(0);
