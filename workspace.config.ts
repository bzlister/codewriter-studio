import workspaceFiles from './workspace-files.json';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodewriterStyles = {
  background?: React.CSSProperties;
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
    highlighting: { [key: string ]: React.CSSProperties; }
  };
  charsPerSecond: number;
  alpha?: number;
}

export const defaultConfig: WorkspaceConfig = {
  files: workspaceFiles,
  theme: {
    common: {
      "background": Theme.prism['pre[class*="language-"]'].background
    },
    highlighting: Theme.prism,
    editor: {},
    header: {}
  },
  charsPerSecond: 15
};