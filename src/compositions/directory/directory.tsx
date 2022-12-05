import React, {useContext, useEffect, useState} from 'react';
import {Context, Typing, useTypewriter} from '../../utils';

export type Directory = {
	name: string;
	children?: Array<Directory>;
};

interface DirectoryProps {
	currentPath: string[];
	typing: boolean;
}

const pathToDir = (path: string[], segment = 0): Directory => {
	if (segment < path.length - 1) {
		return {
			name: path[segment],
			children: [pathToDir(path, segment + 1)],
		};
	}

	return {name: path[segment]};
};

const merge = (
	newDir: Directory,
	dest: Directory[],
	parentReference: Directory
): void => {
	if (!dest || (newDir?.children?.length && newDir.children.length > 1)) {
		throw new Error('Invalid merge');
	}

	const insertAt = dest.find((dir) => dir.name === newDir.name);
	if (insertAt) {
		if (!!insertAt.children) {
			return merge(newDir!.children![0], insertAt.children, insertAt);
		}

		insertAt.children = [newDir!.children![0]];
		return;
	}

	dest = [...dest, newDir];
	parentReference.children = dest;
	return;
};

export const Directory = (props: DirectoryProps & {width: number}) => {
	const {currentPath, typing, width} = props;
	const {theme} = useContext(Context);

	const [dir, setDir] = useState<Directory>({name: '/', children: []});

	useEffect(() => {
		merge(pathToDir(currentPath), dir.children!, dir);
		setDir(dir);
	}, [currentPath]);

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
	const isOpened = !!opened?.includes(dir.name);
	const isTyping = isOpened && !!typing;
	const typed = useTypewriter(dir.name.length, isTyping);
	const printed = isTyping ? dir.name.substring(0, typed) : dir.name;

	const {setTyping} = useContext(Context);
	const signalCompletion = !dir.children && typed === dir.name.length;
	useEffect(() => {
		if (signalCompletion) {
			setTyping(Typing.editor);
		}
	}, [signalCompletion]);

	return (
		<>
			<div
				style={{
					background:
						isOpened && !dir.children ? 'rgba(255,255,255,150)' : undefined,
				}}
			>
				{printed}
			</div>
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
	const current = useTypewriter(name.length, true);
	const typedText = name.substring(0, current);

	const {setTyping} = useContext(Context);
	const finished = typedText === name;

	useEffect(() => {
		if (finished) {
			setTyping(Typing.editor);
		}
	}, [finished]);

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
