import workspaceFiles from './workspace-files.json';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';
import videoBg from './assets/videoBg.mp4';
import sunrise from './assets/sunrise_-_83880 (720p).mp4';

type CodewriterStyles = Pick<React.CSSProperties, 'background'
  | 'backgroundColor'
  | 'fontFamily'
  | 'fontSize'
  | 'color'
  | 'borderRadius'>;

const setOpacity = (color: React.CSSProperties['color'], opacity: number): React.CSSProperties['color'] => {
  if (opacity < 0 || opacity > 255)
    return color;
  if (opacity > 0 && opacity < 1)
    opacity = Math.floor(opacity*255);

  if (typeof color === "string") {
    if (color.charAt(0) === '#') {
      if (color.length > 7)
        color = color.substring(0, 7);

      let opacityHex = opacity.toString(16).toUpperCase();
      if (opacityHex.length === 1)
        opacityHex = "0" + opacityHex;
      
      return color + opacityHex;
    }
  }

  return color;
}

export type WorkspaceConfig = {
  files: {
    path: string;
    content: string;
    language: string;
  }[];
  theme: {
    common: CodewriterStyles,
    editor: CodewriterStyles,
    header: CodewriterStyles,
  };
  canvas: {
    videoUrl?: string;
    imgUrl?: string;
    overlay?: boolean
  }
  charsPerSecond: number;
}

export const defaultConfig: WorkspaceConfig = {
  files: workspaceFiles,
  theme: {
    common: {
      background: Theme.prism['pre[class*="language-"]'].background
    },
    editor: { ...Theme.prism, borderRadius: 20, backgroundColor: setOpacity(Theme.prism['pre[class*="language-"]'].background as string, 0.9) },
    header: {
      background: Theme.prism['pre[class*="language-"]'].background,
      backgroundColor: setOpacity(Theme.prism['pre[class*="language-"]'].background as string, 0.9),
      fontFamily: 'sans-serif',
      fontSize: 16,
      color: '#1a1a1b',
    }
  },
  canvas: {
    videoUrl: sunrise
  },
  charsPerSecond: 15
};


