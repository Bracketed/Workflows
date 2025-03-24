import { getGitBranch } from './getBranch';
import { getGitRepo } from './getRepository';

export function buildURL(file: string) {
	const branch = getGitBranch();
	const repo = getGitRepo();

	return `https://github.com/${repo}/blob/${branch}/${file}`;
}
