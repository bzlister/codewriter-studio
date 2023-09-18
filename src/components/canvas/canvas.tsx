import React, {useMemo, PropsWithChildren} from 'react';
import {useCurrentFrame, useVideoConfig, Video} from 'remotion';
import './canvas.css';

interface CanvasProps {
	type: 'solid' | 'image' | 'video';
	url?: string;
	color?: React.CSSProperties['color'];
	overlay?: boolean;
}

export const Canvas = (props: PropsWithChildren<CanvasProps>) => {
	const {type, url, color, overlay, children} = props;
	const {width, height} = useVideoConfig();

	return (
		<div className="background">
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
