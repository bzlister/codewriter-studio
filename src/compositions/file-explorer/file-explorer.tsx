import React, {useEffect, useState, useMemo} from 'react';
import {ControlStatus, useControl, useTypewriter} from '../../utils';

type File = {
	name: string;
	typed?: boolean;
};

type Directory = File & {
	contents: (Directory | File)[]; // Potentially make more explicit type for file names
};

const pathToDir = (pathHierarchy: string[]): Directory | File =>
	pathHierarchy[0].includes('.')
		? {name: pathHierarchy[0]}
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

const markAsTyped = (directory: Directory, pathHierarchy: string[]): void => {
	const entry = directory.contents.find(
		(child) => child.name === pathHierarchy[0]
	);
	if (!entry) {
		throw new Error('Current file path not found in directory');
	}

	entry.typed = true;
	if ((entry as Directory).contents) {
		return markAsTyped(entry as Directory, pathHierarchy.slice(1));
	}
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
			setDirectory((oldDir) => {
				markAsTyped(oldDir, currentPathHierarchy);
				return oldDir;
			});
			callback();
		}
	}, [done, currentPathHierarchy, callback]);

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
					key={child.name}
					entry={child}
					pathHierarchy={currentPathHierarchy}
					typedCharacters={focused ? len : currentPath.length}
				/>
			))}
		</div>
	);
};

interface FileSystemTreeProps {
	entry: Directory | File;
	pathHierarchy: string[];
	typedCharacters: number;
}

const FileSystemTree = (props: FileSystemTreeProps) => {
	const {entry, pathHierarchy, typedCharacters} = props;
	if (pathHierarchy.length === 0) {
		throw new Error('Invalid file system structure');
	}

	const isDir = Boolean((entry as Directory).contents);
	const shouldType = !entry.typed && entry.name === pathHierarchy[0];

	return (
		<>
			<div>
				{shouldType
					? entry.name.substring(
							0,
							Math.min(entry.name.length, typedCharacters)
					  )
					: entry.name}
			</div>
			{isDir && (
				<div style={{paddingLeft: 10}}>
					{(entry as Directory).contents.map((child) => (
						<FileSystemTree
							key={child.name}
							entry={child}
							pathHierarchy={pathHierarchy.slice(1)}
							typedCharacters={Math.max(0, typedCharacters - entry.name.length)}
						/>
					))}
				</div>
			)}
		</>
	);
};
