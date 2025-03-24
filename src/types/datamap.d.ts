export interface FileDataMap {
	markdown: string;
	type?: string;
	file: string;
	dir: string;
	content: {
		name?: string;
		url: string;
		description: string;
		inputs: Array<{
			name: string;
			values: any;
		}>;
	};
}
