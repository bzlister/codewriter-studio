import workspaceFiles from './workspace-files.json';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodewriterStyles = {
  background?: React.CSSProperties['background'];
  backgroundColor?: string;
  text?: { [key: string ]: React.CSSProperties };
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
  charsPerSecond: number;
}

export const defaultConfig: WorkspaceConfig = {
  files: workspaceFiles,
  theme: {
    common: {
      background: Theme.prism['pre[class*="language-"]'].background
    },
    editor: {
      text: Theme.prism
    },
    header: {
      background: Theme.prism['pre[class*="language-"]'].background,
      backgroundColor: Theme.prism['pre[class*="language-"]'].background as string
    }
  },
  charsPerSecond: 15
};