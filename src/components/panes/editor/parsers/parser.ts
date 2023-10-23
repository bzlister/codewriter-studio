import {Language} from '../../../../config';
import {ParseTree} from './parse-core';
import {parseTS} from './typescript';

export const parse = (language: Language, content: string): ParseTree[] => {
	try {
		switch (language) {
			case 'typescript':
				return parseTS(content);
			default:
				return [{unformatted: content}];
		}
	} catch (err) {
		// log
		return [{unformatted: content}];
	}
};
