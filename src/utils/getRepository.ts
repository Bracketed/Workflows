import { Logger } from '@bracketed/logger';
import { execSync } from 'node:child_process';
const Console = new Logger({ prefix: 'Terminal' });

export function getGitRepo(): string {
	try {
		Console.info('Getting Github Repository from git...');
		const output = execSync('git remote get-url origin', { encoding: 'utf8' });
		const match = output.trim().match(/(?:github\.com[:/])([^/]+)\/([^/]+)/);

		if (match && match[1] && match[2]) {
			Console.info('Found Repository:', `${match[1]}/${match[2]}`);
			return `${match[1]}/${match[2]}`;
		} else return '';
	} catch (error) {
		Console.error('Error fetching Github origin URL:', error);
		return '';
	}
}
