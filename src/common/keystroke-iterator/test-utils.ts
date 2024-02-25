import {Language} from '../../config';
import {IKeystrokeIterator, KeystrokeIterator} from './keystroke-iterator';

export class TestKeystrokeIterator implements IKeystrokeIterator {
	private Post: string = '';
	private iter: IKeystrokeIterator;
	private _pedantic = false;

	constructor(language: Language, content: string) {
		this.iter = new KeystrokeIterator(language, content, '\r\n');
	}

	next(): [string, string] | null {
		if (this.pedantic) return this.iter.next();

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

	get pedantic() {
		return this._pedantic;
	}

	set pedantic(value: boolean) {
		if (this._pedantic) throw 'Cannot unset';
		this._pedantic = value;
	}
}
