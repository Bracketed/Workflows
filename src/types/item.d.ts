import type { Input } from './input';

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
