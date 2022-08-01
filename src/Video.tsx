import {Composition} from 'remotion';
import { TypewriterComposition } from './typewriter-composition';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={TypewriterComposition}
				durationInFrames={480}
				fps={20}
				width={1280}
				height={720}
			/>
		</>
	);
};
