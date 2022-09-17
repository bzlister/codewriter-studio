import React, {useEffect, useState, useMemo} from 'react';
import {ControlStatus, useControl, useTypewriter} from '../../utils';

type Directory = {
	name: string;
	contents: (Directory | string)[]; // Potentially make more explicit type for file names
};

const pathToDir = (pathHierarchy: string[]): Directory | string =>
	pathHierarchy[0].includes('.')
		? pathHierarchy[0]
		: {
				// Potentially improve this with Regex
				name: pathHierarchy[0],
				contents:
					pathHierarchy.length > 1 ? [pathToDir(pathHierarchy.slice(1))] : [],
		  };

const addPath = (directory: Directory, pathHierarchy: string[]): void => {
	if (directory.name === pathHierarchy[0]) {
		if (pathHierarchy.length > 1) {
			const matching = directory.contents.find(
				(subDir) =>
					typeof subDir !== 'string' && subDir.name === pathHierarchy[1]
			);
			if (matching) {
				return addPath(matching as Directory, pathHierarchy.slice(1));
			}

			directory.contents.push(pathToDir(pathHierarchy.slice(1)));
			return;
		}

		throw Error('Attempted to add existing path to directory');
	}

	directory.contents.push(pathToDir(pathHierarchy));
};

interface FileExplorerProps {
	currentPath: string;
	focused: boolean;
	width: number;
	theme: {[key: string]: React.CSSProperties};
	callback: () => void;
}

export const FileExplorer = (props: FileExplorerProps) => {
	const {currentPath, focused, width, theme, callback} = props;

	const currentPathHierarchy = useMemo(
		() => currentPath.split('/'),
		[currentPath]
	);
	const [directory, setDirectory] = useState<Directory>({
		name: 'root',
		contents: [],
	});
	const frame = useControl(focused ? ControlStatus.play : ControlStatus.reset);
	const len = useTypewriter(currentPath.length, frame);

	const done = focused && len >= currentPath.length;
	useEffect(() => {
		if (done) {
			callback();
		}
	}, [done, callback]);

	useEffect(() => {
		setDirectory((oldDir) => {
			addPath(oldDir, ['root', ...currentPathHierarchy]);
			return {...oldDir};
		});
	}, [currentPathHierarchy]);

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
			{directory.contents.map((child) => (
				<FileSystemTree
					key={JSON.stringify(child)}
					entry={child}
					opened={{
						pathHierarchy: currentPathHierarchy,
						typedCharacters: focused ? len : currentPath.length,
					}}
				/>
			))}
		</div>
	);
};

interface FileSystemTreeProps {
	entry: Directory | string;
	opened?: {
		pathHierarchy: string[];
		typedCharacters: number;
	};
}

const FileSystemTree = (props: FileSystemTreeProps) => {
	const {entry, opened} = props;
	const {pathHierarchy, typedCharacters} = opened || {};
	if (pathHierarchy && pathHierarchy.length === 0) {
		throw new Error('Invalid file system structure');
	}

	const isDir = typeof entry !== 'string';
	const name = isDir ? entry.name : entry;
	const withinOpened =
		pathHierarchy &&
		(typedCharacters || typedCharacters === 0) &&
		name === pathHierarchy[0];

	return withinOpened ? (
		<>
			<div style={{background: 'yellow'}}>
				{name.substring(0, Math.min(name.length, typedCharacters))}
			</div>
			{isDir && (
				<div style={{paddingLeft: 10}}>
					{entry.contents.map((child) => (
						<FileSystemTree
							key={JSON.stringify(child)}
							entry={child}
							opened={{
								pathHierarchy: pathHierarchy.slice(1),
								typedCharacters: Math.max(0, typedCharacters - name.length),
							}}
						/>
					))}
				</div>
			)}
		</>
	) : (
		<>
			<div>{name}</div>
			{isDir && (
				<div style={{paddingLeft: 10}}>
					{entry.contents.map((child) => (
						<FileSystemTree key={JSON.stringify(child)} entry={child} />
					))}
				</div>
			)}
		</>
	);
};
