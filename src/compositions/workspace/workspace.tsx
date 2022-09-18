import React, {useState} from 'react';
import {useVideoConfig} from 'remotion';
import {Editor} from '../editor/editor';
import './workspace.css';
import {WorkspaceConfig} from '../../../workspace.config';
import {FileExplorer} from '../file-explorer/file-explorer';

export const Workspace = ({
	files,
	theme,
}: Pick<WorkspaceConfig, 'files' | 'theme'>) => {
	const {width} = useVideoConfig();
	const [currentFileIndex, setCurrentFileIndex] = useState(0);
	const file = files[currentFileIndex];

	const [focus, setFocus] = useState<Focus>(Focus.directory);

	return (
		<div className="grid-parent">
			<FileExplorer
				currentPath={file.path}
				focused={focus === Focus.directory}
				width={300}
				theme={theme}
				callback={() => {
					setFocus(Focus.editor);
				}}
			/>
			<Editor
				code={file.content}
				language={file.language}
				focused={focus === Focus.editor}
				theme={theme}
				cursorColor="rgba(0, 0, 30, 255)"
				maxLines={25}
				width={width - 300}
				callback={
					currentFileIndex < files.length - 1
						? () => {
								setFocus(Focus.directory);
								setCurrentFileIndex((i) => i + 1);
						  }
						: () => {
								setFocus(Focus.none);
						  }
				}
			/>
		</div>
	);
};

enum Focus {
	none,
	directory,
	editor,
}
