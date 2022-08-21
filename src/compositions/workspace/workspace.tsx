import React, {useEffect, useMemo, useState} from 'react';
import {useVideoConfig} from 'remotion';
import {merge} from 'lodash';
import {Directory} from '../directory/directory';
import {Typewriter} from '../typewriter/typewriter';
import './workspace.css';
import {WorkspaceConfig} from '../../../workspace.config';

const getId = (path: string, level: number) => `${path}_${level}`;

const pathToDir = (
	path: string[],
	qualified: string,
	segment = 0
): Directory => {
	const id = getId(qualified, segment);
	if (segment < path.length - 1) {
		return {
			name: path[segment],
			children: [pathToDir(path, qualified, segment + 1)],
			id,
		};
	}

	return {name: path[segment], id};
};

export const Workspace = ({
	files,
	theme,
}: Pick<WorkspaceConfig, 'files' | 'theme'>) => {
	const {width, height} = useVideoConfig();
	const [currentFile, setCurrentFile] = useState(0);
	const file = files[currentFile];

	const currentPath = useMemo(() => file.path.split('/'), [file]);

	const [typedLevel, setTypedLevel] = useState(0);

	const [typing, setTyping] = useState<Typing>(Typing.none);

	const [dir, setDir] = useState<Directory>();

	useEffect(() => {
		setDir(merge(dir || ({} as Directory), pathToDir(currentPath, file.path)));
		setTypedLevel(0);
	}, [currentPath]);

	return dir ? (
		<div className="grid-parent">
			<Directory
				dir={dir}
				width={300}
				theme={theme}
				opened={getId(file.path, typedLevel)}
				typing={typing === Typing.directory}
			/>
			<Typewriter
				code={file.content}
				language={file.language}
				typing={typing === Typing.editor}
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

enum Typing {
	none,
	directory,
	editor,
}
