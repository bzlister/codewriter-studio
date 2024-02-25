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

	constructor(
		language: Language,
		private readonly raw: string,
		private readonly eol: '\r\n' | '\n'
	) {
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

		const allowsMultiLineStrings = group?.allowsMultiLineStrings;
		if (this.post.length && i === this.post[this.post.length - 1].indx) {
			const groupingSymbol = this.post.pop();
			groupingSymbol!.chars.trim();
			this.overrideMatchers.pop();
			this.indx += groupingSymbol!.chars.length;
		} else if (group) {
			if (group.groupMatcherOverride) {
				this.overrideMatchers.push(group.groupMatcherOverride);
			}

			this.post.push(group.end);
			this.indx += group.start.length;
		} else if (
			this.raw.substring(i, i + this.eol.length) === this.eol &&
			(i === 0 || this.raw.charAt(i - 1) !== '\\')
		) {
			this.indx += this.eol.length;
		} else {
			this.indx += 1;
		}

		return [this.raw.substring(0, this.indx), this.printClosure()];
	}

	private printClosure(): string {
		return this.post.length
			? this.post.map((p) => p.chars).reduceRight((S, s) => `${S}${s}`)
			: '';
	}
}
