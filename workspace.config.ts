import workspaceFiles from './workspace-files.json';
import * as Theme from 'react-syntax-highlighter/dist/esm/styles/prism';


export type WorkspaceConfig = {
  files: {
    path: string;
    content: string;
    language: string;
  }[];
  theme: {
    [key: string]: React.CSSProperties;
  };
  charsPerSecond: number;
  alpha?: number;
}

export const defaultConfig: WorkspaceConfig = {
  files: workspaceFiles,
  theme: Theme.prism,
  charsPerSecond: 15
};