import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {useTypewriter} from '../../utils';

export type Directory = {
	name: string;
	id: string;
	children?: Array<Directory>;
};

interface DirectoryTreeProps {
	dir: Directory;
	opened?: string;
	typing?: boolean;
}

export const Directory = (
	props: DirectoryTreeProps & {
		width: number;
		theme: {[key: string]: React.CSSProperties};
	}
) => {
	const {dir, opened, typing, width, theme} = props;
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div
			style={{
				width,
				background: theme['pre[class*="language-"]'].background,
				padding: '5%',
				borderWidth: '0.1em',
				borderColor: 'black',
				borderStyle: 'solid',
			}}
		>
			<DirectoryTree dir={dir} opened={opened} typing={typing} />
		</div>
	);
};

const DirectoryTree = ({
	dir,
	opened,
	typing,
}: DirectoryTreeProps): JSX.Element => {
	return (
		<>
			{typing && !!opened && opened === dir.id ? (
				<TypedName name={dir.name} />
			) : (
				<div
					style={{
						background:
							!!opened && dir.id === opened
								? 'rgba(255,255,255,150)'
								: undefined,
					}}
				>
					{dir.name}
				</div>
			)}
			{!!dir.children && (
				<div
					style={{
						paddingLeft: '10px',
					}}
				>
					{dir.children.map((child) => (
						<DirectoryTree dir={child} opened={opened} typing={typing} />
					))}
				</div>
			)}
		</>
	);
};

const TypedName = ({name}: {name: string}) => {
	const current = useTypewriter(name.length);
	const typedText = name.substring(0, current);

	return (
		<div
			style={{
				borderWidth: '0.1em',
				borderColor: 'blue',
				borderStyle: 'solid',
			}}
		>
			{typedText}
		</div>
	);
};
