import React, {useContext} from 'react';
import {Context} from '../../utils';
import './header.css';

interface HeaderProps {
	fileName: string;
}

export const Header = (props: HeaderProps) => {
	const {fileName} = props;
	const {theme} = useContext(Context);

	return (
		<div
			style={{
				backgroundColor: '#ffffff00',
			}}
		>
			<span
				className="folder-tab selected"
				style={{
					...theme.common,
					...theme.header,
					marginLeft: 20,
				}}
			>
				<span>{fileName}</span>
			</span>
		</div>
	);
};
