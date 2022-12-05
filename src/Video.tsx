import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Composition, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Workspace} from './compositions/workspace/workspace';
import {defaultConfig} from '../workspace.config';

const useOdd = (frame: number) => {
	const oddCount = useRef(0);
	if (frame % 2 === 1) {
		oddCount.current += 1;
	}
	return {props: oddCount.current, done: oddCount.current >= 10};
};

const StatefulComponent = () => {
	const {height, width} = useVideoConfig();
	const frame = useCurrentFrame();

	const odds = useOdd(frame);

	return (
		<div
			style={{background: 'white', textAlign: 'center', height, width}}
		>{`${odds.props} odds in ${frame}`}</div>
	);
};

export const RemotionVideo: React.FC = () => {
	return (
		<Composition
			id="MyComp"
			component={() => <Workspace {...defaultConfig} />}
			durationInFrames={500}
			fps={60}
			width={1280}
			height={720}
		/>
	);
};
