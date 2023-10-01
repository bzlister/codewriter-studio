import React, {useState} from 'react';
import {Composition} from 'remotion';
import {CodewriterConfig} from './config';
import {Workspace} from './components/workspace/workspace';
import {Canvas} from './components/canvas/canvas';
import {CodewriterContext} from './common/context';

export const AppContainer = (config: CodewriterConfig) => {
	const {
		width,
		height,
		workspace,
		canvas: {type, ...canvasProps},
		animation,
		files,
		theme,
	} = config;
	const {fps} = animation;
	const [duration, setDuration] = useState(10);

	return (
		<Composition
			id="codewriter"
			component={() => (
				<Canvas type={type} {...canvasProps}>
					<CodewriterContext.Provider value={{theme, animation}}>
						<Workspace {...workspace} files={files} setDuration={setDuration} />
					</CodewriterContext.Provider>
				</Canvas>
			)}
			durationInFrames={duration}
			fps={fps}
			width={width}
			height={height}
		/>
	);
};
