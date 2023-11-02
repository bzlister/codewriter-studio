import {assert} from '../util';

export type GroupingSymbol = {chars: string; indx: number};
export type GroupMatcher = (i: number, s: string) => Group | undefined;
export type Group = {
	start: string;
	end: GroupingSymbol;
	groupMatcherOverride?: GroupMatcher;
};

const equals = (symbol: string, s: string, at: number) =>
	s.substring(at, at + symbol.length) === symbol;

export const groupMatcherFactory =
	(groupingSymbolInfo: [string, string, GroupMatcher?][]): GroupMatcher =>
	(i: number, s: string) => {
		const groupInfo = groupingSymbolInfo.find(([symbol, _]) =>
			equals(symbol, s, i)
		);

		if (groupInfo) {
			const [start, end, fn] = groupInfo;
			let open = 1;
			let j = i + 1;
			while (j < s.length) {
				if (equals(end, s, j)) {
					open--;
					j += end.length - 1;
				} else if (equals(start, s, j)) {
					open++;
					j += start.length - 1;
				}
				if (open === 0) {
					break;
				}

				j++;
			}

			assert(open === 0, `Expected to close group ${s.substring(i)}`);
			return {start, end: {chars: end, indx: j}, groupMatcherOverride: fn};
		}

		return undefined;
	};
