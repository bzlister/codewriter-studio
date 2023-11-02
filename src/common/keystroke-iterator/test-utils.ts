import {Language} from '../../config';
import {getKeystrokeIterator} from './keystroke-iterator';
import {IKeystrokeIterator} from './keystroke-iterator-core';

export class TestKeystrokeIterator implements IKeystrokeIterator {
	private Post: string = '';
	private iter: IKeystrokeIterator;

	constructor(language: Language, content: string) {
		this.iter = getKeystrokeIterator(language, content);
	}

	next(): [string, string] | null {
		let pair: [string, string] | null;
		let Pre: string = '';

		while ((pair = this.iter.next()) != null) {
			const [pre, post] = pair;
			Pre = pre;
			if (post !== this.Post) {
				this.Post = post;
				return [pre, this.Post];
			}
		}

		return Pre ? [Pre, this.Post] : null;
	}
}
