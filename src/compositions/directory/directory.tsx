import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';

export type Directory = {
	name: string;
	children: Array<string | Directory>;
};

interface DirectoryProps {
	dir: Directory;
	viewing?: string;
	width: number;
	theme: {[key: string]: React.CSSProperties};
}

export const Directory = (props: DirectoryProps) => {
	const {dir, viewing, width, theme} = props;
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div
			style={{
				width,
				background: theme['pre[class*="language-"]'].background,
				padding: '5%',
			}}
		>
			<DirectoryTree {...{dir, viewing}} />
		</div>
	);
};

const DirectoryTree = ({
	dir,
	viewing,
}: Pick<DirectoryProps, 'dir' | 'viewing'>): JSX.Element => {
	return (
		<>
			<div>{dir.name}</div>
			<div
				style={{
					paddingLeft: '10px',
				}}
			>
				{dir.children.map((child) =>
					typeof child === 'string' ? (
						<div>{child}</div>
					) : (
						<DirectoryTree dir={child} viewing={viewing} />
					)
				)}
			</div>
		</>
	);
};
