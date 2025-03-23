import path from 'node:path';

export function stripFirst(fpath: string) {
	const parts = path.normalize(fpath).split(path.sep);
	parts.shift();

	return path.join(...parts);
}
