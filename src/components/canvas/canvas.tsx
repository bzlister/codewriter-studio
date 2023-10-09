import React, {PropsWithChildren, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {useVideoConfig, Video} from 'remotion';
import './canvas.css';

interface CanvasProps {
	type: 'solid' | 'image' | 'video' | 'none';
	url?: string;
	background?: React.CSSProperties['background'];
	overlay?: boolean;
}

export const Canvas = (props: PropsWithChildren<CanvasProps>) => {
	const {type, url, background, overlay, children} = props;
	const {width, height} = useVideoConfig();

	return type === 'none' ? (
		<>{children}</>
	) : (
		<div className="canvas">
			{url ? (
				type === 'video' ? (
					<Video src={url} width={width} height={height} muted>
						<div className="content">{children}</div>
					</Video>
				) : (
					<img src={url} width={width} height={height}>
						<div className="content">{children}</div>
					</img>
				)
			) : (
				<div style={{background, width, height}}>
					<div className="content">{children}</div>
				</div>
			)}
		</div>
	);
};

/*
export const getCanvasColorFromTheme = (
	theme: Record<string, React.CSSProperties>,
	ref: HTMLElement
): React.CSSProperties['backgroundColor'] => {
	const background: React.CSSProperties['background'] =
		theme['div.code-toolbar > .toolbar.toolbar > .toolbar-item > a'][
			'background'
		];

	debugger;
	const x = window.getComputedStyle(ref).backgroundColor;
	return x;
};
*/
