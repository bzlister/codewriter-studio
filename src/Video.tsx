import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Composition, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Workspace} from './compositions/workspace/workspace';
import {defaultConfig} from '../workspace.config';

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
