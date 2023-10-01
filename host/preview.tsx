import {registerRoot} from 'remotion';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';
import {AppContainer} from '../src/app-container';
import {CodewriterConfig, defaultConfig, File} from '../src/config';

const files: File[] = [
	{
		path: 'src/app.ts',
		language: 'typescript',
		content: `export const setOpacity = (
		color: React.CSSProperties['color'],
		opacity: number
	): React.CSSProperties['color'] => {
		if (opacity < 0 || opacity > 255) return color;
		if (opacity > 0 && opacity < 1) opacity = Math.floor(opacity * 255);
	
		if (typeof color === 'string') {
			if (color.charAt(0) === '#') {
				if (color.length > 7) color = color.substring(0, 7);
	
				let opacityHex = opacity.toString(16).toUpperCase();
				if (opacityHex.length === 1) opacityHex = '0' + opacityHex;
	
				return color + opacityHex;
			}
		}
	
		return color;
	};`,
	},
	{
		path: 'src/components/canvas/canvas.css',
		language: 'css',
		content: `.background {
			position: relative;
		}
		
		.content {
			position: absolute;
			top: 15px;
			left: 15px;
		}
		`,
	},
];

const previewConfig: CodewriterConfig = {
	width: 1280,
	height: 720,
	workspace: {
		fileTab: false,
		directory: false,
	},
	canvas: {
		type: 'solid',
	},
	theme: Theme.coldarkCold,
	animation: {
		fps: 5,
		framesPerChar: 5,
		sound: 'none',
	},
	files: files,
};
registerRoot(() => AppContainer(previewConfig));

/*
type File = {path: string; content: string; language?: string};
function loadContent(dir: string, files: File[]) {
	fs.readdirSync(dir).forEach((file) => {
		const absolute = path.join(dir, file);
		if (fs.statSync(absolute).isDirectory()) {
			return loadContent(absolute, files);
		}

		const extension = absolute.includes('.')
			? absolute.substring(absolute.lastIndexOf('.') + 1)
			: undefined;
		return files.push({
			path: dir,
			content: fs.readFileSync(absolute).toString().trim(),
			language: extension,
		});
	});

	return files;
}
*/
