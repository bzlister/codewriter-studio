import React, {useContext} from 'react';
import {Context} from '../../utils';

interface HeaderProps {
	fileName: string;
}

export const Header = (props: HeaderProps) => {
	const {fileName} = props;
	const {theme} = useContext(Context);

	return (
		<div
			style={{
				background: theme['pre[class*="language-"]'].background,
				padding: 10,
			}}
		>
			{fileName}
		</div>
	);
};
