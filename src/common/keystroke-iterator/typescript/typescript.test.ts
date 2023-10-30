import {parseTS} from './typescript';

describe('typescript parser', () => {
	it('braces', () => {
		const tsc = `import { parseTS } from './typescript'`;
		const result = parseTS(tsc);
		expect(result).toEqual([
			{
				unformatted: 'import ',
				group: {start: '{', end: '}', children: [{unformatted: ' parseTS '}]},
			},
			{
				unformatted: ' from ',
				group: {
					start: `'`,
					end: `'`,
					children: [{unformatted: './typescript'}],
				},
			},
		]);
	});
});
