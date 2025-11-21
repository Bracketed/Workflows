import { Logger } from '@bracketed/logger';
import { execSync } from 'node:child_process';
const Console = new Logger({ prefix: 'Terminal' });

export function getLatestCommitFullHash(): string {
	try {
		Console.info('Getting latest commit long hash...');
		const output = execSync('git log -1 --pretty=format:"%H"', { encoding: 'utf8' });
		Console.info('Retrieved latest commit hash:', output.trim());
		return output.trim();
	} catch (error) {
		Console.error('Error fetching latest commit hash:', error);
		return '';
	}
}
