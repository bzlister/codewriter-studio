import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {createElement, Prism} from 'react-syntax-highlighter';
import {Cursor} from 'react-simple-typewriter';
import './typewriter.css';

interface TypewriterCompositionProps {
	code: string;
	charsPerSecond: number;
	language: string;
	theme: {[key: string]: React.CSSProperties};
	cursorColor: `rgba(${number}, ${number}, ${number}, ${number})`;
}

export const TypewriterComposition = (props: TypewriterCompositionProps) => {
	const {code, charsPerSecond, language, theme, cursorColor} = props;
	const {width, height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const current = Math.min(
		Math.round((frame * charsPerSecond) / fps),
		code.length
	);

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

	const typedText = code.substring(
		0,
		Math.min(current + offsets[current], code.length)
	);

	return (
		<div
			style={{
				width,
				height,
				background: theme['pre[class*="language-"]'].background,
			}}
		>
			<Prism
				children={typedText}
				style={theme}
				customStyle={{
					border: 'none',
					background: 'none',
				}}
				renderer={(props) => (
					<>
						{props.rows.map((node) => {
							return createElement({
								node,
								stylesheet: props.stylesheet,
								useInlineStyles: props.useInlineStyles,
								key: '1', // intentional,
							});
						})}
						{typedText.length === code.length ? (
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
