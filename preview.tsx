import {registerRoot} from 'remotion';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';
import {AppContainer} from './src/app-container';
import {CodewriterConfig, defaultConfig} from './src/config';

const previewConfig: CodewriterConfig = {
	width: 1280,
	height: 720,
	workspace: {
		fileTab: false,
		directory: false,
	},
	canvas: {
		type: 'solid',
		color: 'purple',
	},
	theme: Theme.coldarkCold,
	animation: {
		fps: 5,
		framesPerChar: 5,
		sound: 'none',
	},
	contentSource: '',
};
registerRoot(() => AppContainer(previewConfig));
