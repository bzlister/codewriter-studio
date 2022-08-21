import React, {createContext, useMemo} from 'react';
import {WorkspaceConfig} from '../workspace.config';

type ContextType = Pick<WorkspaceConfig, 'charsPerSecond'>;

export const Context = createContext<ContextType>({
	charsPerSecond: 15,
});

export const ContextProvider = (
	props: WorkspaceConfig & {
		children: (props: Omit<WorkspaceConfig, keyof ContextType>) => JSX.Element;
	}
) => {
	const {children, charsPerSecond, ...config} = props;

	const contextValue = useMemo(() => ({charsPerSecond}), [charsPerSecond]);

	return (
		<Context.Provider value={contextValue}>
			{React.createElement(children, config)}
		</Context.Provider>
	);
};
