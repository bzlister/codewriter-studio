import React, {useRef, useState} from 'react';
import {Composition} from 'remotion';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';

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
		theme: initialTheme,
		showLineNumbers,
	} = config;
	const {fps} = animation;
	const [duration, setDuration] = useState(10000);
	const [theme, setTheme] = React.useState(initialTheme);
	const dropdownOptions = Object.keys(Theme).map((name) => (
		<option value={name}>{name}</option>
	));

	return (
		<>
			<select
				id="dropdownSelect"
				onChange={(event) => {
					const x = Theme[event.target.value];
					debugger;
					setTheme(x);
				}}
			>
				{dropdownOptions}
			</select>
			<Composition
				id="codewriter"
				component={() => (
					<Canvas type={type} background={'turquoise'} {...canvasProps}>
						<CodewriterContext.Provider
							value={{theme, animation, showLineNumbers}}
						>
							<Workspace
								{...workspace}
								files={files}
								setDuration={setDuration}
							/>
						</CodewriterContext.Provider>
					</Canvas>
				)}
				durationInFrames={duration}
				fps={fps}
				width={width}
				height={height}
			/>
		</>
	);
};
