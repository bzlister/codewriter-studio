import React, {useEffect, useMemo, useState} from 'react';
import {WorkspaceConfig} from '../../../../workspace.config';
import {Context, useIter} from '../../../utils';
import {Editor} from '../../editor/editor';
import {Header} from '../../header/header';

export type StandardEditorWorkspaceProps = {
	showFileName: boolean;
};

export const StandardEditorWorkspace = ({
	files,
	theme,
	charsPerSecond,
	showFileName,
}: WorkspaceConfig & StandardEditorWorkspaceProps) => {
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
			<Header fileName={file.path} />
			<Editor
				code={file.content}
				language={file.language}
				typing={!done}
				cursorColor={'rgba(0, 0, 30, 255)'}
				maxLines={25}
			/>
		</Context.Provider>
	) : (
		<div>Loading...</div>
	);
};
