import {getKeystrokeIterator} from '../keystroke-iterator';
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
});
