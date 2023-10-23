import {createContext} from 'react';
import {CodewriterConfig} from '../config';

export const CodewriterContext = createContext<
	Pick<CodewriterConfig, 'theme' | 'animation' | 'showLineNumbers'>
>({
	theme: {} as CodewriterConfig['theme'],
	animation: {} as CodewriterConfig['animation'],
	showLineNumbers: false,
});
