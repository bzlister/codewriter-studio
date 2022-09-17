import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Composition, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Workspace} from './compositions/workspace/workspace';
import {defaultConfig} from '../workspace.config';
import {ContextProvider} from './context-provider';

export const RemotionVideo: React.FC = () => {
	return (
		<Composition
			id="MyComp"
			component={() => <ContextProvider {...{...defaultConfig, children: Workspace}} />}
			durationInFrames={500}
			fps={20}
			width={1280}
			height={720}
		/>
	);
};
