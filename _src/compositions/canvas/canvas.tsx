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

	const background = videoUrl ? (
		<Video src={videoUrl} width={width} height={height} muted />
	) : imgUrl ? (
		<img src={imgUrl} width={width} height={height} />
	) : undefined;

	return (
		<div style={{width, height}}>
			{!!background && (
				<>
					{overlay && <div className="overlay"></div>}
					{background}
				</>
			)}
			<div className="content">{children}</div>
		</div>
	);
};
