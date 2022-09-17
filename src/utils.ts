import { useContext, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion"
import { Context } from "./context-provider";

export const useTypewriter = (length: number, frame: number) => {
  const start = useRef(frame);
  const { fps } = useVideoConfig();
  const { charsPerSecond } = useContext(Context);

  return Math.min(Math.round(((frame - start.current) * charsPerSecond) / fps), length);
}

export const useControl = (status: ControlStatus) => {
	const frame = useCurrentFrame();
	const previousFrame = useRef<number>(frame);
	const virtual = useRef(0);

	if (previousFrame.current !== frame) {
		if (status === ControlStatus.play) {
			virtual.current += frame - previousFrame.current;
		} else if (status === ControlStatus.reset) {
			virtual.current = 0;
		}
		previousFrame.current = frame;
	}

	return virtual.current;
};

export enum ControlStatus {
	play,
	pause,
	reset
}