import { createContext, useContext, useMemo, useRef, useState } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion"
import { WorkspaceConfig } from "../workspace.config";


type ContextType = Pick<WorkspaceConfig, 'charsPerSecond' | 'theme'> & {
	setRecentlyCompleted: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export const Context = createContext<ContextType>({
	charsPerSecond: 0,
	setRecentlyCompleted: () => {},
	theme: {}
});

export const useControl = (play: boolean) => {
	const frame = useCurrentFrame();
	const playAt = useRef(0);

	return useMemo(() => {
		if (play) {
			playAt.current += 1;
		}
		
		return playAt.current;
	}, [frame]);
};

export const useTypewriter = (length: number, typing: boolean) => {
  const frame = useControl(typing);
  const start = useRef(frame);
  const {fps} = useVideoConfig();
  const { charsPerSecond } = useContext(Context);

  return Math.min(Math.round(((frame - start.current) * charsPerSecond) / fps), length);
}

export const useIter = <T>(arr: T[]): [T, () => void, boolean] => {
	const [index, setIndex] = useState(0);
	const next = () => {
		if (index !== arr.length - 1) {
			setIndex(index + 1);
		}
	};

	return [arr[index], next, index === arr.length - 1]; 
}