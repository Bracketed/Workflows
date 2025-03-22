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
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const Console = new Logger({ prefix: 'ActionsReader' });

type Path = string | URL;

class ActionsFinder {
	private readonly dir: string;
	public readonly actions: Array<string>;

	constructor(dir: string) {
		this.dir = dir;

		this.actions = this.getFiles(path.resolve(import.meta.dirname, this.resolvePath(this.dir)), /\.ya?ml$/);
	}

	private resolvePath(path: Path): string {
		if (typeof path === 'string') return path;
		return fileURLToPath(path);
	}

	private getFiles(dir: string, regex: RegExp): Array<string> {
		let results: Array<string> = [];

		const list = fs.readdirSync(dir);

		list.forEach((file) => {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);

			if (stat && stat.isDirectory()) results = results.concat(this.getFiles(filePath, regex));
			else if (regex.test(file)) results.push(filePath);
		});

		return results;
	}
}

const Actions = new ActionsFinder('../actions');

const ActionsFiles = Actions.actions.map((p) => ({
	full: path.join(path.dirname(fileURLToPath(import.meta.url)), p),
	file: path.relative(path.dirname(fileURLToPath(import.meta.url)), p).replace(/\\/g, '/'),
	dir: path.parse(path.relative(path.dirname(fileURLToPath(import.meta.url)), p).replace(/\\/g, '/')).dir,
	content: yaml.load(path.join(path.dirname(fileURLToPath(import.meta.url)), p)),
}));

Console.info(ActionsFiles);
