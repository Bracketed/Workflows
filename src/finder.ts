import { Logger } from '@bracketed/logger';
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ActionWorkflow } from './types/action-workflow.js';
import { Path } from './types/path.js';
import { HttpsJsonSchemastoreOrgGithubActionJson } from './types/schemas/actions.js';
import { Workflow } from './types/workflow.js';
import { stripFirst } from './utils/index.js';

export class ActionsFinder {
	private readonly dir: string;
	private readonly logger: Logger = new Logger({ prefix: 'Finder' });

	constructor(dir: string) {
		this.dir = dir;
	}

	public async load(): Promise<Array<ActionWorkflow>> {
		const files = this.getFiles(path.resolve(import.meta.dirname, this.resolvePath(this.dir)), /\.ya?ml$/);

		const content = await Promise.all(
			files.map(async (p) => {
				const content = await yaml.load(fs.readFileSync(p, 'utf8'));
				const fpath = path.relative(path.dirname(fileURLToPath(import.meta.url)), p);
				this.logger.info(`Loaded Yaml content in ${stripFirst(fpath).replace(/\\/g, '/')}`);

				return {
					content: content as HttpsJsonSchemastoreOrgGithubActionJson | Workflow,
					relative: fpath.replace(/\\/g, '/'),
					directory: path.parse(fpath).dir,
				};
			})
		);

		return content;
	}

	private resolvePath(path: Path): string {
		if (typeof path === 'string') return path;
		return fileURLToPath(path);
	}

	private getFiles(dir: string, regex: RegExp): Array<string> {
		const exemptions: { files: string[]; folders: string[] } = {
			files: ['.yarnrc.yml'],
			folders: ['node_modules', '.git', 'dist', '.yarn'],
		};
		let results: Array<string> = [];

		const list = fs.readdirSync(dir);

		list.forEach((file) => {
			if (exemptions.folders.includes(file) || exemptions.files.includes(file)) return;

			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);

			if (stat && stat.isDirectory()) results = results.concat(this.getFiles(filePath, regex));
			else if (regex.test(file)) {
				results.push(filePath);
				this.logger.info(
					`Got Action/Workflow ${stripFirst(path.relative(path.dirname(fileURLToPath(import.meta.url)), filePath)).replace(/\\/g, '/')}`
				);
			}
		});

		return results;
	}
}
