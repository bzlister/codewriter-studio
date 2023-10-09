import React, {useContext} from 'react';
import {createElement, Prism} from 'react-syntax-highlighter';
import {CodewriterContext} from '../../../common/context';
import {useKeystrokes} from '../../../common/util';
import {File} from '../../../config';
import './editor.css';

interface EditorProps {
	file: File;
	active: boolean;
	showLineNumbers: boolean;
	done: () => void;
}

export const Editor = (props: EditorProps) => {
	const {file, active, showLineNumbers, done} = props;
	const {language, content, path} = file;
	const {theme} = useContext(CodewriterContext);

	const keystrokes = useKeystrokes(active);

	return (
		<div className="editor">
			<Prism
				children={content}
				language={language}
				style={theme}
				showLineNumbers={showLineNumbers}
			/>
		</div>
	);
};
