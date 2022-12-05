import { createContext, useContext, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion"
import { WorkspaceConfig } from "../workspace.config";


export enum Typing {
	none,
	directory,
	editor,
}

type ContextType = Pick<WorkspaceConfig, 'charsPerSecond' | 'theme'> & {
	setTyping: React.Dispatch<React.SetStateAction<Typing>>;
};
export const Context = createContext<ContextType>({
	charsPerSecond: 0,
	setTyping: () => {},
	theme: {}
});

export const useControl = (play: boolean) => {
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

export const useTypewriter = (length: number, typing: boolean) => {
  const frame = useControl(typing);
  const start = useRef(frame);
  const {fps} = useVideoConfig();
  const { charsPerSecond } = useContext(Context);

  return Math.min(Math.round(((frame - start.current) * charsPerSecond) / fps), length);
}
