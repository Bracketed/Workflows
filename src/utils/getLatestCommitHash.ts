import { Logger } from '@bracketed/logger';
import { execSync } from 'node:child_process';
const Console = new Logger({ prefix: 'Terminal' });

export function getLatestCommitHash(): string {
	try {
		Console.info('Getting latest commit short hash...');
		const output = execSync('git log -1 --pretty=format:"%h"', { encoding: 'utf8' });
		Console.info('Retrieved latest commit short hash:', output.trim());
		return output.trim();
	} catch (error) {
		Console.error('Error fetching latest commit hash:', error);
		return '';
	}
}
