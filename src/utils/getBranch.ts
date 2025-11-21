import { Logger } from '@bracketed/logger';
import { execSync } from 'node:child_process';
const Console = new Logger({ prefix: 'Terminal' });

export function getGitBranch(): string {
	try {
		Console.info('Getting current repository branch...');
		const output = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' });
		Console.info('Retrieved repository branch:', output.trim());
		return output.trim();
	} catch (error) {
		Console.error('Error fetching branch:', error);
		return '';
	}
}
