import {registerRoot} from 'remotion';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';
import {AppContainer} from '../src/app-container';
import {CodewriterConfig, defaultConfig, File} from '../src/config';
import files from './files.json';

const previewConfig: CodewriterConfig = {
	width: 1280,
	height: 720,
	workspace: {
		fileTab: false,
		directory: false,
	},
	canvas: {
		type: 'none',
	},
	theme: Theme.coldarkCold,
	animation: {
		fps: 30,
		framesPerChar: 10,
		sound: 'none',
	},
	files: files as File[],
	showLineNumbers: true,
};
registerRoot(() => AppContainer(previewConfig));
