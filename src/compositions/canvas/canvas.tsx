import React, {useMemo, PropsWithChildren} from 'react';
import {useCurrentFrame, useVideoConfig, Video} from 'remotion';
import './canvas.css';

interface CanvasProps {
	videoUrl?: string;
	imgUrl?: string;
	overlay?: boolean;
}

export const Canvas = (props: PropsWithChildren<CanvasProps>) => {
	const {videoUrl, imgUrl, overlay, children} = props;
	const {width, height} = useVideoConfig();

	return (
		<div style={{width, height}}>
			<div className="overlay"></div>
			<Video src={videoUrl} muted />
			<div className="content">{children}</div>
		</div>
	);
};
