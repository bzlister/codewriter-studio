import React from 'react';
import {Composition} from 'remotion';
import {CodewriterConfig} from '../config';

export const Codewriter = (config: CodewriterConfig) => {
	const {canvas, animation} = config;
	const {width, height} = canvas;
	const {fps} = animation;

	return (
		<Composition
			id="codewriter"
			component={() => <div>Codewriter</div>}
			durationInFrames={calculateDuration()}
			fps={fps}
			width={width}
			height={height}
		/>
	);
};

const calculateDuration = () => 500;
