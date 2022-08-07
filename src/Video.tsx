import {Composition} from 'remotion';
import {TypewriterComposition} from './typewriter-composition';
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism';

const text = `class MyApp extends StatelessWidget {
	const MyApp({Key? key}) : super(key: key);

	@override
	Widget build(BuildContext context) {
		return MaterialApp(
			theme: ThemeData(
				primarySwatch: Colors.blue,
			),
			home: Scaffold(
				appBar: AppBar(
					title: const Text('Firebase auth tutorial'),
				),
				body: const LoaderOverlay(child: AuthenticationWrapper()),
			),
		);
	}
}`;
export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={() =>
					TypewriterComposition({
						code: text,
						language: 'dart',
						charsPerSecond: 15,
						maxLines: 25,
						theme: prism,
						cursorColor: 'rgba(0, 0, 30, 255)',
					})
				}
				durationInFrames={2000}
				fps={40}
				width={1280}
				height={720}
			/>
		</>
	);
};
