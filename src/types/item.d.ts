import { Input } from './input.js';

export interface FinderItem {
	file: string;
	dir: string;
	content: {
		name: string;
		url: string;
		description: string;
		inputs: Array<Input>;
	};
}
