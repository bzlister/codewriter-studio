import React, {useEffect, useMemo, useState} from 'react';
import {useVideoConfig} from 'remotion';
import {merge} from 'lodash';
import {Directory} from '../directory/directory';
import {Typewriter} from '../typewriter/typewriter';
import './workspace.css';
import {WorkspaceConfig} from '../../../workspace.config';

const pathToDir = (path: string[], segment = 0): Directory | string => {
	if (segment < path.length - 1) {
		return {name: path[segment], children: [pathToDir(path, segment + 1)]};
	}

	return path[segment];
};

export const Workspace = ({files, charsPerSecond, theme}: WorkspaceConfig) => {
	const {width, height} = useVideoConfig();
	const [currentFile, setCurrentFile] = useState(0);
	const file = files[currentFile];

	const currentPath = useMemo(() => file.path.split('/'), [file]);

	const [dir, setDir] = useState<Directory>();

	useEffect(() => {
		setDir(merge({} as Directory, dir || {}, pathToDir(currentPath)));
	}, [currentPath]);

	return dir ? (
		<div className="grid-parent">
			<Directory
				dir={dir}
				viewing={currentPath[currentPath.length - 1]}
				width={300}
				theme={theme}
			/>
			<Typewriter
				code={file.content}
				language={file.language}
				charsPerSecond={charsPerSecond}
				theme={theme}
				cursorColor={'rgba(0, 0, 30, 255)'}
				maxLines={25}
				width={width - 300}
				height={height}
			/>
		</div>
	) : (
		<div>Loading...</div>
	);
};
