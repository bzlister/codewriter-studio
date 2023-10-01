import React, {useState} from 'react';
import {CodewriterConfig, File} from '../../config';
import {Directory} from '../panes/directory/directory';
import {Editor} from '../panes/editor/editor';
import {FileTab} from '../panes/file-tab/file-tab';
import './workspace.css';

interface WorkspaceProps {
	fileTab: boolean;
	directory: boolean;
	files: File[];
	setDuration: (frame: number) => void;
}

export const Workspace = (props: WorkspaceProps) => {
	const {fileTab, directory, files, setDuration} = props;
	const [fileIndex, setFileIndex] = useState(0);

	return (
		<div className="workspace">
			{directory ? <Directory /> : <></>}
			<div className="editor-filetab-container">
				{fileTab ? <FileTab /> : <></>}
				<Editor />
			</div>
		</div>
	);
};
