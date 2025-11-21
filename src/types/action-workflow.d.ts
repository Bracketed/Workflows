import type { HttpsJsonSchemastoreOrgGithubActionJson } from './schemas';
import type { Workflow } from './workflow';

export type ActionWorkflow = {
	content: HttpsJsonSchemastoreOrgGithubActionJson | Workflow;
	relative: string;
	directory: string;
};
