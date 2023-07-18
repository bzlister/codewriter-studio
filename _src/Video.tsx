import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Composition, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {EditorWithDirectoryWorkspace} from './compositions/workspaces/editor-with-directory/editor-with-directory';
import {StandardEditorWorkspace} from './compositions/workspaces/standard-editor/standard-editor';
import {defaultConfig} from '../workspace.config';

export const RemotionVideo: React.FC = () => {
	return (
		<Composition
			id="MyComp"
			component={() => (
				<StandardEditorWorkspace {...defaultConfig} showFileName={true} />
			)}
			durationInFrames={500}
			fps={60}
			width={1280}
			height={720}
		/>
	);
};
