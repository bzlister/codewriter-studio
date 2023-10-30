import React, {useContext, useMemo, useRef, useState} from 'react';
import {createElement, Prism} from 'react-syntax-highlighter';
import {AutoSizer, List} from 'react-virtualized';
import {tokenize, languages as PrismLanguages} from 'prismjs';
import refractor from 'refractor';
//import tsx from 'refractor/lang/tsx';
import typescript from 'refractor/lang/typescript';
import {CodewriterContext} from '../../../common/context';
import {useKeystrokes} from '../../../common/util';
import {File} from '../../../config';
import './editor.css';
import {parse} from '../../../common/keystroke-iterator/parse-tree';

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

const testcontent = `const {file, active, done} = props;
const {language, content, path} = file;
const {theme, showLineNumbers} = useContext(CodewriterContext);`;
const testcontent2 = `const f = (args: any) => { console.log(args); };`;

export const Editor = (props: EditorProps) => {
	const {file, active, done} = props;
	const {language, content, path} = file;
	const {theme, showLineNumbers} = useContext(CodewriterContext);

	const keystrokes = useKeystrokes(active);
	const parsed = useMemo(() => parse('typescript', testcontent2), [file]);

	return (
		<div className="editor">
			<Prism
				id={'prism'}
				language={language}
				style={theme}
				showLineNumbers={showLineNumbers}
				renderer={({rows, stylesheet, useInlineStyles}) => {
					debugger;
					return (
						<div className="auto">
							<AutoSizer>
								{({height, width}) => (
									<List
										height={height}
										width={width}
										rowHeight={fontSize * lineHeight}
										rowRenderer={({index, key, style}) =>
											createElement({
												node: rows[index],
												stylesheet,
												style,
												useInlineStyles,
												key,
											})
										}
										rowCount={rows.length}
										overscanRowCount={OverScanRowCount}
									/>
								)}
							</AutoSizer>
						</div>
					);
				}}
			>
				{testcontent2}
			</Prism>
		</div>
	);
};
