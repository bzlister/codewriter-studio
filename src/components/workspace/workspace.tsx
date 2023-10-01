import React, {useState} from 'react';
import {CodewriterConfig, File} from '../../config';
import {Editor} from '../panes/editor/editor';
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
			{directory ? <div className="directory"></div> : <></>}
			<div className="editor-filetab-container">
				{fileTab ? <div className="fileTab"></div> : <></>}
				<div className="editor">
					<Editor />
				</div>
			</div>
		</div>
	);
};
