import React, {useEffect, useMemo, useState} from 'react';
import {useVideoConfig} from 'remotion';
import {Directory} from '../directory/directory';
import {Typewriter} from '../typewriter/typewriter';
import './workspace.css';
import {WorkspaceConfig} from '../../../workspace.config';
import {Context, Typing} from '../../utils';

const DirectoryPaneWidth = 300;

export const Workspace = ({files, theme, charsPerSecond}: WorkspaceConfig) => {
	const {width, height} = useVideoConfig();
	const [currentFile, setCurrentFile] = useState(0);
	const file = files[currentFile];

	const currentPath = useMemo(() => file.path.split('/'), [file]);

	const [typing, setTyping] = useState<Typing>(Typing.directory);

	return dir ? (
		<Context.Provider value={{charsPerSecond, setTyping, theme}}>
			<div className="grid-parent">
				<Directory
					dir={dir}
					width={DirectoryPaneWidth}
					currentPath={currentPath}
					typing={typing === Typing.directory}
				/>
				<Typewriter
					code={file.content}
					language={file.language}
					typing={typing === Typing.editor}
					cursorColor={'rgba(0, 0, 30, 255)'}
					maxLines={25}
					width={width - DirectoryPaneWidth}
					height={height}
				/>
			</div>
		</Context.Provider>
	) : (
		<div>Loading...</div>
	);
};
