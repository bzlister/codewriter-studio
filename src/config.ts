import {CSSProperties} from 'react';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';

export enum Language {
	JS,
	TS,
}

export type File = {
	path: string;
	content: string;
	language: Language;
};

export type CodewriterConfig = {
	width: number;
	height: number;
	workspace: {
		fileTab: boolean;
		directory: boolean;
	};
	canvas:
		| {type: 'none'}
		| {type: 'solid'; color: CSSProperties['color']}
		| {type: 'image'; url: string}
		| {type: 'video'; url: string};
	theme: (typeof Theme)[keyof typeof Theme]; // TODO - narrow
	animation: {
		fps: number;
		framesPerChar: number;
		sound: 'none' | 'standard';
	};
	content: File[];
};

export const defaultConfig: Omit<CodewriterConfig, 'contentSource'> = {
	width: 1280,
	height: 720,
	workspace: {
		fileTab: false,
		directory: false,
	},
	canvas: {
		type: 'none',
	},
	theme: Theme.atomDark,
	animation: {
		fps: 60,
		framesPerChar: 4,
		sound: 'none',
	},
};