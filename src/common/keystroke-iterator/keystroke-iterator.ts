import {Language} from '../../config';
import {assert} from '../util';
import {GroupingSymbol, GroupMatcher} from './group';
import {matchGroupsTS} from './typescript/typescript';

export interface IKeystrokeIterator {
	next(): [string, string] | null;
}

export class KeystrokeIterator implements IKeystrokeIterator {
	private indx = 0;
	private post: GroupingSymbol[] = [];
	private groupMatcher: GroupMatcher;
	private overrideMatchers: GroupMatcher[] = [];

	constructor(language: Language, private readonly raw: string) {
		switch (language) {
			case 'typescript':
				this.groupMatcher = matchGroupsTS;
				break;
			default:
				this.groupMatcher = () => undefined;
		}
	}

	next(): [string, string] | null {
		let i = this.indx;
		if (i === this.raw.length) return null;

		const matcher = this.overrideMatchers.length
			? this.overrideMatchers[this.overrideMatchers.length - 1]
			: this.groupMatcher;
		const group = matcher(i, this.raw);

		if (this.post.length && i === this.post[this.post.length - 1].indx) {
			const groupingSymbol = this.post.pop();
			this.overrideMatchers.pop();
			i += groupingSymbol!.chars.length;
		} else if (group) {
			if (group.groupMatcherOverride) {
				this.overrideMatchers.push(group.groupMatcherOverride);
			}

			this.post.push(group.end);
			i += group.start.length;
		} else {
			i += 1;
		}

		this.indx = i;
		return [this.raw.substring(0, i), this.printClosure()];
	}

	private printClosure(): string {
		return this.post.length
			? this.post.map((p) => p.chars).reduceRight((S, s) => `${S}${s}`)
			: '';
	}
}
