import React, {useMemo, useState} from 'react';
import {Composition} from 'remotion';
import {CodewriterConfig} from '../config';
import {CodewriterContainer} from './codewriter-container';
import {ControlContext, ConfigContext} from './common/context';

export const AppContainer = (config: CodewriterConfig) => {
	const {width, height, workspace, canvas, animation, contentSource, theme} =
		config;
	const {fps} = animation;
	const [duration, setDuration] = useState(10);

	const files = []; //useMemo(() => loadContent(contentSource, []), []);

	return (
		files && (
			<Composition
				id="codewriter"
				component={() => (
					<CodewriterContainer
						canvas={canvas}
						theme={theme}
						animation={animation}
						workspace={workspace}
						setDuration={setDuration}
					/>
				)}
				durationInFrames={duration}
				fps={fps}
				width={width}
				height={height}
			/>
		)
	);
};

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
