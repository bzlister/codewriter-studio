import {assert} from '../util';

type Token = string | RegExp;
export type GroupingSymbol = {chars: string; indx: number};
export type GroupMatcher = (i: number, src: string) => Group | undefined;
export type Group = {
	start: string;
	end: GroupingSymbol;
	groupMatcherOverride?: GroupMatcher;
};

const match = (symbol: Token, src: string, at: number) => {
	if (symbol === '') throw `'' is not allowed`;
	if (typeof symbol === 'string')
		return src.substring(at, at + symbol.length) === symbol ? symbol : null;

	const m = src.substring(at).match(symbol);
	return m ? m[0] : null;
};

export const groupMatcherFactory =
	(groupingSymbolInfo: [Token, Token, GroupMatcher?][]): GroupMatcher =>
	(i: number, src: string) => {
		let start: string = '';
		let groupInfo: [Token, Token, GroupMatcher?] | null = null;
		for (let g of groupingSymbolInfo) {
			const m = match(g[0], src, i);
			if (m) {
				start = m;
				groupInfo = g;
				break;
			}
		}

		if (groupInfo) {
			const [startToken, endToken, fn] = groupInfo;
			let end: string = '';
			let open = 1;
			let j = i + 1;
			while (j < src.length) {
				let m: string | null = null;
				if ((m = match(endToken, src, j))) {
					open--;
					j += m.length - 1; // -1 because it will naturally incrememnt by one at the end of the loop
				} else if ((m = match(startToken, src, j))) {
					open++;
					j += m.length - 1; // ditto
				}
				if (open === 0) {
					assert(!!m, 'Expected to have match');
					end = m!;
					break;
				}

				j++;
			}

			assert(open === 0, `Expected to close group ${src.substring(i)}`);
			return {start, end: {chars: end, indx: j}, groupMatcherOverride: fn};
		}

		return undefined;
	};
