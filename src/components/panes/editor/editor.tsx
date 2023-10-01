import React, {useContext} from 'react';
import {createElement, Prism} from 'react-syntax-highlighter';
import {CodewriterContext} from '../../../common/context';
import {File} from '../../../config';
import './editor.css';

interface EditorProps {
	file: File;
	done: () => void;
}

export const Editor = (props: EditorProps) => {
	const {file, done} = props;
	const {language, content, path} = file;
	const {theme} = useContext(CodewriterContext);

	return (
		<div className="editor">
			<Prism
				children={content}
				language={language}
				style={theme}
				showLineNumbers
			/>
		</div>
	);
};
