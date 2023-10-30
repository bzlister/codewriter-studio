export type GroupingSymbol = {chars: string; indx: number};
export type GroupMatcher = (i: number, s: string) => Group | undefined;
export type Group = {
	start: string;
	end: GroupingSymbol;
	groupMatcherOverride?: GroupMatcher;
};

export const groupMatcherFactory =
	(groupingSymbolInfo: [string, string, GroupMatcher?][]): GroupMatcher =>
	(i: number, s: string) => {
		const groupInfo = groupingSymbolInfo.find(([symbol, _]) => false);

		return undefined;
	};
