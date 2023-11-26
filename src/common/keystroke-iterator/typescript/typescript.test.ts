import {KeystrokeIterator} from '../keystroke-iterator';
import {TestKeystrokeIterator} from '../test-utils';
import files from './files.json';

describe('typescript parser', () => {
	xit('braces', () => {
		const tsc = `import { parseTS } from './typescript'`;
		const iter = new TestKeystrokeIterator('typescript', tsc);
		expect(iter.next()).toEqual(['import {', '}']);
		expect(iter.next()).toEqual(['import { parseTS }', '']);
		expect(iter.next()).toEqual([`import { parseTS } from '`, `'`]);
		expect(iter.next()).toEqual([`import { parseTS } from './typescript'`, '']);
		expect(iter.next()).toBeNull();
	});

	xit(`' escapes formatting`, () => {
		const tsc = `const x = '(_)'`;
		const iter = new TestKeystrokeIterator('typescript', tsc);
		expect(iter.next()).toEqual([`const x = '`, `'`]);
		expect(iter.next()).toEqual([`const x = '(_)'`, '']);
		expect(iter.next()).toBeNull();
	});

	xit('` applies different escape conditions', () => {
		const tsc = '(`"_"`)';
		const iter = new KeystrokeIterator('typescript', tsc);
		expect(iter.next()).toEqual(['(', ')']);
		expect(iter.next()).toEqual(['(`', '`)']);
		expect(iter.next()).toEqual(['(`"', '`)']);
		expect(iter.next()).toEqual(['(`"_', '`)']);
		expect(iter.next()).toEqual(['(`"_"', '`)']);
		expect(iter.next()).toEqual(['(`"_"`', ')']);
		expect(iter.next()).toEqual(['(`"_"`)', '']);
		expect(iter.next()).toBeNull();
	});

	it('newline', () => {
		const tsc = files[0].content;
		const iter = new KeystrokeIterator('typescript', tsc);
		advanceUntil(iter, 'const a = ');
		expect(iter.next()).toEqual(['const a = `', '`']);
		expect(iter.next()).toEqual(['const a = `\\', '`']);
		expect(iter.next()).toEqual(['const a = `\\r', '`']);
		expect(iter.next()).toEqual(['const a = `\\r\\', '`']);
		expect(iter.next()).toEqual(['const a = `\\r\\n', '`']);
		expect(iter.next()).toEqual(['const a = `\\r\\n`', '']);

		advanceUntil(
			iter,
			`const a = \`\\\\r\\\\n\`;
const b = `
		);
		expect(iter.next()).toEqual([
			`const a = \`\r\n\`;
const b = \``,
			'`',
		]);
		expect(iter.next()).toEqual([
			`const a = \`\r\n\`;
			const b = \`
			`,
			'`',
		]);
		expect(iter.next()).toEqual([
			`const a = \`\r\n\`;
			const b = \`
			\``,
			'',
		]);

		advanceUntil(
			iter,
			`const a = \`\r\n\`;
			const b = \`
			\`;
			
			const fn = `
		);
		expect(iter.next()).toEqual([
			`const a = \`\r\n\`;
			const b = \`
			\`;
			
			const fn = (`,
			')',
		]);
		advanceNTimes(iter, 9);
		expect(iter.next()).toEqual([
			`const a = \`\r\n\`;
			const b = \`
			\`;
			
			const fn = (s: string)`,
			'',
		]);

		advanceNTimes(iter, 4);
		expect(iter.next()).toEqual([
			`const a = \`\r\n\`;
			const b = \`
			\`;
			
			const fn = (s: string) => {`,
			'}',
		]);
		expect(iter.next()).toEqual([
			`const a = \`\r\n\`;
			const b = \`
			\`;
			
			const fn = (s: string) => {
				`,
			'\r\n}',
		]);
	});
});

function advanceUntil(iter: KeystrokeIterator, s: string) {
	while (true) {
		const printed = iter.next();
		if (printed === null)
			throw `Expected to find ${s} but reached end of string`;
		else if (printed[0] === s) break;
	}
}

function advanceNTimes(iter: KeystrokeIterator, n: number) {
	Array(n)
		.fill(1)
		.forEach((_) => iter.next());
}
