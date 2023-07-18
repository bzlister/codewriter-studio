import {CSSProperties} from 'react';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';

export type CodewriterConfig<T extends CanvasType> = {
	IDE: {
		fileTab: boolean;
		directory: boolean;
	};
	canvas: CanvasConfig<T>;
	theme: (typeof Theme)[keyof typeof Theme]; // TODO - narrow
	typing: {
		charsPerSecond: number;
		sound: 'none' | 'standard';
	};
	contentSource: string;
};

export const defaultConfig: Omit<CodewriterConfig<'none'>, 'contentSource'> = {
	IDE: {
		fileTab: false,
		directory: false,
	},
	canvas: {
		type: 'none',
	},
	theme: Theme.atomDark,
	typing: {
		charsPerSecond: 15,
		sound: 'none',
	},
};

type CanvasType = 'none' | 'solid' | 'image' | 'video';
type CanvasConfig<T extends CanvasType> = {
	type: T;
} & (T extends 'none'
	? {}
	: T extends 'solid'
	? {color: CSSProperties['color']}
	: T extends 'image' | 'video'
	? {url: string}
	: never);
