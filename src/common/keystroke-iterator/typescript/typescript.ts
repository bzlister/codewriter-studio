import {assert} from '../../util';
import {groupMatcherFactory, GroupMatcher} from '../group';

export const matchGroupsTS: GroupMatcher = groupMatcherFactory([
	['(', ')'],
	['{', '}'],
	['[', ']'],
	[
		'`',
		'`',
		groupMatcherFactory([
			['(', ')'],
			['{', '}'],
			['[', ']'],
		]),
	],
	['/**', ' */'],
	[`'`, `'`, (i, s) => undefined],
	[`"`, `"`, (i, s) => undefined],
]);
