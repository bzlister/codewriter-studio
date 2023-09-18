import React, {useContext} from 'react';
import {Canvas} from './components/canvas/canvas';
import {CodewriterConfig} from '../config';
import {Workspace} from './components/workspace/workspace';

interface CodewriterContainerProps {
	workspace: CodewriterConfig['workspace'];
	canvas: CodewriterConfig['canvas'];
	theme: CodewriterConfig['theme'];
	animation: CodewriterConfig['animation'];
	setDuration: React.Dispatch<React.SetStateAction<number>>;
}
export const CodewriterContainer = (props: CodewriterContainerProps) => {
	const {
		workspace,
		canvas: {type, ...canvasProps},
		theme,
		animation,
		setDuration,
	} = props;

	return type === 'none' ? (
		<Workspace />
	) : (
		<Canvas type={type} {...canvasProps}>
			<Workspace />
		</Canvas>
	);
};
