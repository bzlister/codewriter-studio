import React, {PropsWithChildren} from 'react';
import {useVideoConfig, Video} from 'remotion';
import './canvas.css';

interface CanvasProps {
	type: 'solid' | 'image' | 'video' | 'none';
	url?: string;
	color?: React.CSSProperties['color'];
	overlay?: boolean;
}

export const Canvas = (props: PropsWithChildren<CanvasProps>) => {
	const {type, url, color, overlay, children} = props;
	const {width, height} = useVideoConfig();

	return type === 'none' ? (
		<div>{children}</div>
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
				<div style={{background: color, width, height}}>
					<div className="content">{children}</div>
				</div>
			)}
		</div>
	);
};
