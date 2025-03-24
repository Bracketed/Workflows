import { Logger } from '@bracketed/logger';
import { compileFromFile } from 'json-schema-to-typescript';
import fs from 'node:fs';
import promised from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const Console = new Logger({ prefix: 'TypeGenerator' });
const schemas = getFiles(path.resolve(import.meta.dirname, 'schemas'), /\.json$/);
const base = path.resolve(import.meta.dirname, 'src');
if (!fs.existsSync(path.join(base, 'types', 'schemas'))) fs.mkdirSync(path.join(base, 'types', 'schemas'));
const types = path.resolve(base, 'types', 'schemas');
if (fs.existsSync(path.join(types, 'index.d.ts'))) fs.rmSync(path.join(types, 'index.d.ts'), { force: true });

for (const schema of schemas) {
	const type = await compileFromFile(schema);
	const file = path.parse(path.relative(path.dirname(fileURLToPath(import.meta.url)), schema).replace(/\\/g, '/'));
	const final = path.join(types, `${file.name}.d.ts`);

	await promised.writeFile(final, type);
	Console.info(`Compiled ${file.base} into ${file.name}.d.ts!`);
}

const typings = getFiles(types, /\.d.ts$/).map((p) => `export * from './${path.parse(p).name.replace('.d', '')}';`);

const final = path.join(import.meta.dirname, 'src', 'types', 'schemas', 'index.d.ts');
await promised.writeFile(final, typings.join('\n'));
Console.info('Built Index.d.ts file successfully!');
