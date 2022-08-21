import {Composition} from 'remotion';
import {Workspace} from './compositions/workspace/workspace';
import {defaultConfig} from '../workspace.config';
import {ContextProvider} from './context-provider';

export const RemotionVideo: React.FC = () => {
	return (
		<Composition
			id="MyComp"
			component={() => (
				<ContextProvider {...defaultConfig}>{Workspace}</ContextProvider>
			)}
			durationInFrames={5000}
			fps={40}
			width={1280}
			height={720}
		/>
	);
};
