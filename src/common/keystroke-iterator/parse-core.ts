import {assert} from '../util';

export type Token = string | RegExp;

export type ParseTree = {
	unformatted: string;
	group?: {
		start: Token;
		end: Token;
		children: ParseTree[];
	};
};

const handleEscape = (
	i: number,
	content: string,
	formatEscapeChars: string[]
) => {
	const c = content.charAt(i);
	const escape = formatEscapeChars.find((f) => c === f);
	if (escape) {
		const escapeEnd = content.indexOf(escape, i + 1);
		assert(
			escapeEnd > i,
			`Expected to close escaped sequence ${content.substring(i)}`
		);

		return escapeEnd;
	}

	return 0;
};

const match = (char: string, token: Token) =>
	typeof token === 'string' ? token === char : char.match(token);

export const getParseTreeCore = (
	content: string,
	groupingSymbols: [Token, Token][],
	formatEscapeChars: string[]
): ParseTree[] => {
	const tree = [];
	let start = 0;
	let i = 0;
	while (i < content.length) {
		const e = handleEscape(i, content, formatEscapeChars);
		if (e) {
			i = e;
		} else {
			const c = content.charAt(i);
			const group = groupingSymbols.find(([g, _]) => match(c, g));
			if (group) {
				let j = i + 1;
				let open = 1;
				while (j < content.length) {
					const subE = handleEscape(j, content, formatEscapeChars);
					if (subE) {
						j = subE;
					} else {
						const lookahead = content.charAt(j);
						if (match(lookahead, group[0])) open++;
						if (match(lookahead, group[1])) open--;
						if (open === 0) break;
					}

					j++;
				}

				assert(open === 0, `Expected to close group ${content.substring(i)}`);
				const block: ParseTree = {
					unformatted: content.substring(start, i),
					group: {
						start: group[0],
						end: group[1],
						children: getParseTreeCore(
							content.substring(i + 1, j),
							groupingSymbols,
							formatEscapeChars
						),
					},
				};
				tree.push(block);
				start = j + 1;
				i = j;
			}
		}

		i++;
	}

	if (start < i) {
		tree.push({unformatted: content.substring(start, i)});
	}

	return tree;
};
