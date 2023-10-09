import {useContext, useMemo, useState} from 'react';
import {useCurrentFrame} from 'remotion';
import {CodewriterContext} from './context';

export const setOpacity = (
	color: React.CSSProperties['color'],
	opacity: number
): React.CSSProperties['color'] => {
	if (opacity < 0 || opacity > 255) return color;
	if (opacity > 0 && opacity < 1) opacity = Math.floor(opacity * 255);

	if (typeof color === 'string') {
		if (color.charAt(0) === '#') {
			if (color.length > 7) color = color.substring(0, 7);

			let opacityHex = opacity.toString(16).toUpperCase();
			if (opacityHex.length === 1) opacityHex = '0' + opacityHex;

			return color + opacityHex;
		}
	}

	return color;
};

export const useKeystrokes = (active: boolean) => {
	const frame = useCurrentFrame();
	const activatedFrame = useMemo(() => frame, [active]);
	const {
		animation: {framesPerChar},
	} = useContext(CodewriterContext);

	return active ? Math.floor((frame - activatedFrame) / framesPerChar) : 0;
};
