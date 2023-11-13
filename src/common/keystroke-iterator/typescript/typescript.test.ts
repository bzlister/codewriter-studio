import {KeystrokeIterator} from '../keystroke-iterator';
import {TestKeystrokeIterator} from '../test-utils';

describe('typescript parser', () => {
	it('braces', () => {
		const tsc = `import { parseTS } from './typescript'`;
		const iter = new TestKeystrokeIterator('typescript', tsc);
		expect(iter.next()).toEqual(['import {', '}']);
		expect(iter.next()).toEqual(['import { parseTS }', '']);
		expect(iter.next()).toEqual([`import { parseTS } from '`, `'`]);
		expect(iter.next()).toEqual([`import { parseTS } from './typescript'`, '']);
		expect(iter.next()).toBeNull();
	});

	it(`' escapes formatting`, () => {
		const tsc = `const x = '(_)'`;
		const iter = new TestKeystrokeIterator('typescript', tsc);
		expect(iter.next()).toEqual([`const x = '`, `'`]);
		expect(iter.next()).toEqual([`const x = '(_)'`, '']);
		expect(iter.next()).toBeNull();
	});

	it('` applies different escape conditions', () => {
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
});
