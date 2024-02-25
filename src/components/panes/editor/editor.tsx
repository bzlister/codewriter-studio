import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {createElement, Prism} from 'react-syntax-highlighter';
import {CodewriterContext} from '../../../common/context';
import {KeystrokeIterator} from '../../../common/keystroke-iterator/keystroke-iterator';
import {useKeystrokes} from '../../../common/util';
import {File} from '../../../config';
import './editor.css';
import Monaco, {useMonaco} from '@monaco-editor/react';

interface EditorProps {
	file: File;
	active: boolean;
	done: () => void;
}

const OverScanRowCount = 10;

// TODO - move to config
const fontSize = 16;
const lineHeight = 1.5;
const start = 0;

export const Editor = (props: EditorProps) => {
	const {file, active, done} = props;
	const {language, content, path} = file;
	const {theme, showLineNumbers} = useContext(CodewriterContext);

	const iter = useMemo(
		() => new KeystrokeIterator(language, content),
		[content]
	);
	const [printed, setPrinted] = useState<[string, string]>(['', '']);
	const keystrokes = useKeystrokes(active);
	const monaco = useMonaco();

	useEffect(() => {
		if (iter && monaco) {
			const next = iter.next();
			if (next) {
				setPrinted(next);
				const model = monaco?.editor.getModel(monaco.Uri.parse('myeditor'));
				const editor = monaco?.editor.getEditors()[0];
				// editor.trigger('keyboard', 'type', {text: content.charAt(keystrokes)});
				model?.onDidChangeContent((event) => {
					debugger;
				});
			} else {
				done();
			}
		}
	}, [keystrokes, monaco]);
	const [pre, post] = printed;

	return (
		<>
			<Monaco
				defaultLanguage="javascript"
				defaultPath="myeditor"
				height="50%"
			/>
			<div className="editor">
				<Prism
					id={'prism'}
					language={language}
					style={theme}
					showLineNumbers={showLineNumbers}
				>
					{pre + '|' + post!}
				</Prism>
			</div>
		</>
	);
};
