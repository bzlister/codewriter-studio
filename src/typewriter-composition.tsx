import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {createElement, Prism} from 'react-syntax-highlighter';
import {Cursor} from 'react-simple-typewriter';
import './typewriter.css';

interface TypewriterCompositionProps {
	code: string;
	language: string;
	theme: {[key: string]: React.CSSProperties};
	cursorColor: `rgba(${number}, ${number}, ${number}, ${number})`;
}

export const TypewriterComposition = (props: TypewriterCompositionProps) => {
	const {code, language, theme, cursorColor} = props;
	const {width, height} = useVideoConfig();
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	/**
	 * Meed to pre-render entire typing animation on load, or the state representing offset
	 * due to leading whitespace will desync from frame if not playing entire animation start
	 * to finish.
	 */
	const offsets = useMemo(() => {
		const _offsets = Array<number>(durationInFrames).fill(0);
		for (let f = 1; f < durationInFrames; f++) {
			const start = f + _offsets[f - 1];
			if (code.charAt(start) === '\n') {
				let w = 0;
				while (
					start + w < code.length &&
					code.charAt(start + w).trim().length === 0
				) {
					w += 1;
				}
				_offsets[f] = _offsets[f - 1] + w;
			} else {
				_offsets[f] = _offsets[f - 1];
			}
		}

		return _offsets;
	}, [durationInFrames]);

	const typedText = code.substring(
		0,
		Math.min(frame + offsets[frame], code.length)
	);

	const done = typedText.trim().length === code.trim().length;

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
						{props.rows.map((node) =>
							createElement({
								node,
								stylesheet: props.stylesheet,
								useInlineStyles: props.useInlineStyles,
								key: '1',
							})
						)}
						{done ? (
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
