import React, {useContext, useEffect, useMemo} from 'react';
import {createElement, Prism} from 'react-syntax-highlighter';
import './editor.css';
import {Context, useControl, useTypewriter} from '../../utils';
import {Cursor} from 'react-simple-typewriter';

interface EditorProps {
	code: string;
	language: string;
	cursorColor: `rgba(${number}, ${number}, ${number}, ${number})`;
	maxLines: number;
	typing: boolean;
}

export const Editor = (props: EditorProps) => {
	const {code, language, cursorColor, maxLines, typing} = props;
	const {setRecentlyCompleted, theme} = useContext(Context);
	const current = useTypewriter(code.length, typing);
	console.log(`bzl ${typing} ${current}`);

	const newLines = useMemo(() => {
		const _newLines = Array<number>(code.split('\n').length).fill(0);
		let last = 0;
		for (let i = 1; i < _newLines.length; i++) {
			_newLines[i] = code.indexOf('\n', last) + 1;
			last = _newLines[i];
		}
		return _newLines;
	}, [code]);

	/**
	 * Meed to pre-render entire typing animation on load, or the state representing offset
	 * due to leading whitespace will desync from frame if not playing entire animation start
	 * to finish.
	 */
	const offsets = useMemo(() => {
		const _offsets = Array<number>(code.length + 1).fill(0);
		for (let c = 1; c <= code.length; c++) {
			const start = c + _offsets[c - 1];
			if (code.charAt(start) === '\n') {
				let w = 0;
				while (
					start + w < code.length &&
					code.charAt(start + w).trim().length === 0
				) {
					w += 1;
				}
				_offsets[c] = _offsets[c - 1] + w;
			} else {
				_offsets[c] = _offsets[c - 1];
			}
		}

		return _offsets;
	}, [code]);

	const end = Math.min(current + offsets[current], code.length);
	const currentLine =
		end >= newLines[newLines.length - 1]
			? newLines.length
			: newLines.findIndex((l) => l >= end);
	const startingLine = Math.max(0, currentLine - maxLines) + 1;

	const typedText = code.substring(newLines[startingLine - 1], end);

	const done = typing && end === code.length;
	useEffect(() => {
		if (done) {
			setRecentlyCompleted('editor');
		}
	}, [done]);

	return (
		<div
			style={{
				background: theme['pre[class*="language-"]'].background,
				borderWidth: '0.1em',
				borderColor: 'black',
				borderStyle: 'solid',
			}}
		>
			<Prism
				children={typedText}
				showLineNumbers
				style={theme}
				customStyle={{
					border: 'none',
					background: 'none',
				}}
				startingLineNumber={startingLine}
				renderer={(props) => (
					<>
						{props.rows.map((node, i) =>
							createElement({
								node,
								stylesheet: props.stylesheet,
								useInlineStyles: props.useInlineStyles,
								key: i,
							})
						)}
						{end === code.length ? (
							<span
								style={{
									color: cursorColor,
								}}
							>
								<Cursor />
							</span>
						) : (
							<span
								style={{
									color: cursorColor,
									fontSize: '16px',
								}}
							>
								|
							</span>
						)}
					</>
				)}
				language={language}
			/>
		</div>
	);
};
