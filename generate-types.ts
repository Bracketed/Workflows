import { Logger } from '@bracketed/logger';
import { compileFromFile } from 'json-schema-to-typescript';
import fs from 'node:fs';
import promised from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type Path = string | URL;
const Console = new Logger({ prefix: 'TypeGenerator' });

function resolvePath(path: Path): string {
	if (typeof path === 'string') return path;
	return fileURLToPath(path);
}

function getFiles(dir: string, regex: RegExp): Array<string> {
	let results: Array<string> = [];

	const list = fs.readdirSync(dir);

	list.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat && stat.isDirectory()) results = results.concat(getFiles(filePath, regex));
		else if (regex.test(file)) results.push(filePath);
	});

	return results;
}

const schemas = getFiles(path.resolve(import.meta.dirname, resolvePath('schemas')), /\.json$/);

for (const schema of schemas) {
	const type = await compileFromFile(schema);
	const file = path.parse(path.relative(path.dirname(fileURLToPath(import.meta.url)), schema).replace(/\\/g, '/'));
	const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), file.dir);
	const final = path.join(dir, 'types', `${file.name}.d.ts`);

	if (!fs.existsSync(path.join(dir, 'types'))) fs.mkdirSync(path.join(dir, 'types'));

	await promised.writeFile(final, type);
	Console.info(`Compiled ${file.base} into ${file.name}.d.ts!`);
}
