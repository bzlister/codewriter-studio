import {CSSProperties} from 'react';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';

export type CodewriterConfig = {
	IDE: {
		fileTab: boolean;
		directory: boolean;
	};
	canvas: {width: number; height: number} & (
		| {type: 'none'}
		| {type: 'solid'; color: CSSProperties['color']}
		| {type: 'image'; url: string}
		| {type: 'video'; url: string}
	);
	theme: (typeof Theme)[keyof typeof Theme]; // TODO - narrow
	animation: {
		fps: number;
		framesPerChar: number;
		sound: 'none' | 'standard';
	};
	contentSource: string;
};

export const defaultConfig: Omit<CodewriterConfig, 'contentSource'> = {
	IDE: {
		fileTab: false,
		directory: false,
	},
	canvas: {
		width: 1280,
		height: 720,
		type: 'none',
	},
	theme: Theme.atomDark,
	animation: {
		fps: 60,
		framesPerChar: 4,
		sound: 'none',
	},
};
