const fs = require('fs');
const path = require('path');

/*
  Usage: node loadWorkspaceFiles [options]

  Options:
    --dir <file>    Specify the root directory
    --out <file>    Specify the output file location
		--ex  <pattern> Exclude files matching <pattern>
*/
const args = process.argv.slice(2);
if (args.length === 0) {
	throw new Error('Pass path to project directory as an argument');
}

let [root, out] = args;
root = path.resolve(process.cwd(), root);
if (!out) out = 'files.json';
else out = path.resolve(process.cwd(), out);
if (path.extname(out) !== '.json') throw 'Output path must be a .json file';

function extToLang(ext) {
	switch (ext) {
		case 'js':
			return 'javascript';
		case 'ts':
			return 'typescript';
		default:
			return ext;
	}
}

function throughDirectory(dir, files) {
	fs.readdirSync(dir).forEach((file) => {
		const absolute = path.join(dir, file);
		if (fs.statSync(absolute).isDirectory()) {
			return throughDirectory(absolute, files);
		}

		const displayPath = absolute;
		const extension = absolute.includes('.')
			? absolute.substring(absolute.lastIndexOf('.') + 1)
			: undefined;
		return files.push({
			path: displayPath,
			content: fs.readFileSync(absolute).toString().trim(),
			language: extToLang(extension),
		});
	});

	return files;
}

const files = throughDirectory(root, []);
const jsonData = JSON.stringify(files, null, 2);
const outDir = path.dirname(out);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(out, jsonData);
