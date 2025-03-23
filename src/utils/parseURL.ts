import { getGitBranch } from './getBranch.js';
import { getGitRepo } from './getRepository.js';

export function buildURL(file: string) {
	const branch = getGitBranch();
	const repo = getGitRepo();

	return `https://github.com/${repo}/blob/${branch}/${file}`;
}
