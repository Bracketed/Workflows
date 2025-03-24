export interface WorkflowCallInput {
	[k: string]: {
		description?: string;
		required?: boolean;
		type: 'boolean' | 'number' | 'string';
		default?: boolean | number | string;
	};
}
