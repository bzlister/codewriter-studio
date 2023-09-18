import {createContext} from 'react';
import {CodewriterConfig} from '../../config';

export const ConfigContext = createContext<
	Pick<CodewriterConfig, 'theme' | 'animation'>
>({
	theme: {} as CodewriterConfig['theme'],
	animation: {} as CodewriterConfig['animation'],
});

export const ControlContext = createContext<{
	setDuration: React.Dispatch<React.SetStateAction<number>>;
}>({
	setDuration: (value: React.SetStateAction<number>) => {},
});
