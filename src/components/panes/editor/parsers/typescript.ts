import {getParseTree, Token} from './parse-core';

const groupingSymbols: [Token, Token][] = [
	['(', ')'],
	['{', '}'],
	['[', ']'],
	['`', '`'],
];

const formatEscapeChars = ["'", '"'];

export const parseTS = (content: string) =>
	getParseTree(content, groupingSymbols, formatEscapeChars);
