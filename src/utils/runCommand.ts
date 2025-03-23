import { Logger } from '@bracketed/logger';
import { execSync } from 'node:child_process';
const Console = new Logger({ prefix: 'Terminal' });

export function runCommand(command: string): string | undefined {
	try {
		Console.info(`Running: ${command}`);
		const output = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
		return output ? output.trim() : undefined;
	} catch (error) {
		Console.error('Error running command:', error);
		return '';
	}
}
