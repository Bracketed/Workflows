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
import { Logger } from '@bracketed/logger';
import promised from 'node:fs/promises';
import {
	buildBaseMarkdown,
	buildDateFooterMarkdown,
	buildFooterMarkdown,
	buildGlossaryMarkdown,
	buildItemMarkdown,
} from './components';
import { ActionsFinder } from './finder';
import type { ActionCallInputs, ActionWorkflow, FileDataMap, WorkflowCall } from './types';
import { buildURL, isGithubAction, isGithubWorkflow, stripFirst } from './utils';
console.clear();

const Console: Logger = new Logger({ depth: 6, prefix: 'Main' });
const Finder: ActionsFinder = new ActionsFinder('../');
const Files: Array<ActionWorkflow> = await Finder.load();

const Data: Array<FileDataMap> = Files.map((a) => {
	let inputs;
	let type;

	if (isGithubAction(a.content)) {
		type = 'action';
		const Call: ActionCallInputs | undefined = a.content.inputs;

		if (!Call) inputs = {};
		else inputs = Call;
	}

	if (isGithubWorkflow(a.content)) {
		type = 'workflow';
		const Call: WorkflowCall | undefined = Object.values(a.content.on)[0] ?? undefined;

		if (!Call) inputs = {};
		else inputs = Call.inputs;
	}

	inputs = Object.entries(inputs as object).map(([key, value]) => ({
		name: key,
		values: value,
	}));

	return {
		type: type,
		file: stripFirst(a.relative).replace(/\\/g, '/'),
		dir: stripFirst(a.directory).replace(/\\/g, '/'),
		content: {
			name: a.content.name as string,
			url: buildURL(stripFirst(a.relative).replace(/\\/g, '/')),
			description: a.content.description,
			inputs: inputs ?? [],
		},
	};
}).map((a) => ({
	...a,
	markdown: buildItemMarkdown(a),
}));

const Workflows = Data.filter((a) => a.type === 'workflow');
const Actions = Data.filter((a) => a.type === 'action');

Console.info('Building React & Markdown...');
const Content: Array<string> = [
	buildBaseMarkdown(),
	buildGlossaryMarkdown({ name: 'Workflows', data: Workflows }, { name: 'Actions', data: Actions }),
	'## Workflows:',
	...Workflows.map((w) => w.markdown),
	'## Actions:',
	...Actions.map((w) => w.markdown),
	buildDateFooterMarkdown(),
	buildFooterMarkdown(),
];

Console.info('Build & Organised React Components!');

await promised.writeFile('./README.md', Content.join('\n').replaceAll('\\', ''), { encoding: 'utf8' });
Console.info('Saved new documentation data!');

process.exit(0);
