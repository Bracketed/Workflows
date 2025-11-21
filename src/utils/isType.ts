import type { HttpsJsonSchemastoreOrgGithubActionJson, Workflow } from '@/types/index';

export function isGithubAction(content: unknown): content is HttpsJsonSchemastoreOrgGithubActionJson {
	return (
		typeof content === 'object' &&
		content !== null &&
		'name' in content &&
		'description' in content &&
		'runs' in content
	);
}

export function isGithubWorkflow(content: unknown): content is Workflow {
	return (
		typeof content === 'object' &&
		content !== null &&
		'name' in content &&
		'description' in content &&
		'jobs' in content
	);
}
