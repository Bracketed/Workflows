import { Logger } from '@bracketed/logger';
import { execSync } from 'child_process';
const Console = new Logger({ prefix: 'Terminal' });

export function getLatestCommitUser(): string {
	try {
		Console.info('Getting Github latest editor username...');
		const output = execSync('git log -1 --pretty=format:"%an"', { encoding: 'utf8' });
		Console.info('Detected', output.trim(), 'to be the latest editor!');
		return output.trim();
	} catch (error) {
		Console.error('Error fetching latest commit user:', error);
		return '';
	}
}
