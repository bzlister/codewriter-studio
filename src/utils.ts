import { useContext, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion"
import { Context } from "./context-provider";

export const useTypewriter = (length: number) => {
  const frame = useCurrentFrame();
  const start = useRef(frame);
  const {fps} = useVideoConfig();
  const { charsPerSecond } = useContext(Context);

  return Math.min(Math.round(((frame - start.current) * charsPerSecond) / fps), length);
} 