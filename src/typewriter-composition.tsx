import React, {useEffect, useRef, useState} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import ReactMarkdown from 'react-markdown';
import {Prism, createElement} from 'react-syntax-highlighter';
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Cursor} from 'react-simple-typewriter';

const sourceText = `class MyApp extends StatelessWidget {
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

const char_per_frame = 1;

export const TypewriterComposition = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, width, height} = useVideoConfig();
	const [offset, setOffset] = useState(0);
	const absements = useRef(Array(durationInFrames).fill(undefined));

	const end = absements.current[frame] ?? frame + offset;
	if (absements.current[frame] === undefined) {
		if (sourceText.charAt(end) === '\n') {
			let i = 0;
			while (
				end + i < sourceText.length &&
				sourceText.substring(0, end).trim() ===
					sourceText.substring(0, end + i).trim()
			) {
				i += 1;
			}
			setOffset(offset + i);
		} else {
			absements.current[frame] = frame + offset;
		}
	}

	const typedText = sourceText
		.substring(0, absements.current[frame] ?? frame + offset)
		.concat('|');

	return (
		<div
			style={{
				width,
				height,
				background: xonokai['pre[class*="language-"]'].background,
			}}
		>
			<Prism
				children={typedText}
				style={xonokai}
				customStyle={{
					border: 'none',
					background: 'none',
				}}
				language={'dart'}
			/>
		</div>
	);
};
/*
          renderer={(props) => (<>
            {props.rows.map(node => createElement({ node, stylesheet: props.stylesheet, useInlineStyles: props.useInlineStyles, key: undefined }))}
            <Cursor />
          </>)}

          */
