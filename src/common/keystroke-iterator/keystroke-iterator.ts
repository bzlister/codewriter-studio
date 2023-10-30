import {Language} from '../../config';
import {
	GroupMatcher,
	IKeystrokeIterator,
	KeystrokeIterator,
} from './keystroke-iterator-core';

export const getKeystrokeIterator = (
	language: Language,
	content: string
): IKeystrokeIterator => {
	let matcher: GroupMatcher = (i: number, s: string) => undefined;
	switch (language) {
		case 'typescript':
			matcher = matchGroupsTS;
			break;
	}

	return new KeystrokeIterator(content, matcher);
};