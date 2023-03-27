import React, {useEffect, useMemo, useState} from 'react';
import {useVideoConfig} from 'remotion';
import {Directory} from '../../directory/directory';
import {Editor} from '../../editor/editor';
import './editor-with-directory.css';
import {WorkspaceConfig} from '../../../../workspace.config';
import {Context, useIter} from '../../../utils';

const DirectoryPaneWidth = 300;

export const EditorWithDirectoryWorkspace = ({
	files,
	theme,
	charsPerSecond,
}: WorkspaceConfig) => {
	const {width, height} = useVideoConfig();
	const [file, loadNext, done] = useIter(files);
	const currentPath = useMemo(() => file.path.split('/'), [file]);
	const [recentlyCompleted, setRecentlyCompleted] = useState<string>();

	useEffect(() => {
		if (recentlyCompleted === 'editor') {
			loadNext();
		}
	}, [recentlyCompleted]);

	return file ? (
		<Context.Provider value={{charsPerSecond, setRecentlyCompleted, theme}}>
			<div className="grid-parent">
				<div style={{width: DirectoryPaneWidth}}>
					<Directory
						width={DirectoryPaneWidth}
						currentPath={currentPath}
						typing={
							!done && (recentlyCompleted === 'editor' || !recentlyCompleted)
						}
					/>
				</div>
				<Editor
					code={file.content}
					language={file.language}
					typing={!done && recentlyCompleted === 'directory'}
					cursorColor={'rgba(0, 0, 30, 255)'}
					maxLines={25}
				/>
			</div>
		</Context.Provider>
	) : (
		<div>Loading...</div>
	);
};
