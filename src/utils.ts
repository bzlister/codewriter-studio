import { useContext, useEffect, useRef, useState } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion"
import { Context } from "./context-provider";

export const useTypewriter = (length: number) => {
  const frame = useCurrentFrame();
  const start = useRef(frame);
  const {fps} = useVideoConfig();
  const { charsPerSecond } = useContext(Context);

  return Math.min(Math.round(((frame - start.current) * charsPerSecond) / fps), length);
}

export const useControl = (play: boolean) => {
	const frame = useCurrentFrame();
	const previousFrame = useRef<number>(frame);
	const virtual = useRef(0);

	if (previousFrame.current !== frame) {
		if (play) {
			virtual.current += frame - previousFrame.current;
		}
		previousFrame.current = frame;
	}

	return virtual.current;
};
