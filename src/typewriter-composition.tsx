import React, {useEffect, useMemo, useRef, useState} from 'react';
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

const useType = (text: string) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const offsets = useMemo(() => {
		const _offsets = Array<number>(durationInFrames).fill(0);
		for (let f = 1; f < durationInFrames; f++) {
			const start = f + _offsets[f - 1];
			if (text.charAt(start) === '\n') {
				let w = 0;
				while (
					start + w < text.length &&
					text.charAt(start + w).trim().length === 0
				) {
					w += 1;
				}
				_offsets[f] = _offsets[f - 1] + w;
			} else {
				_offsets[f] = _offsets[f - 1];
			}
		}

		return _offsets;
	}, [durationInFrames]);

	return text.substring(0, frame + offsets[frame]);
};

export const TypewriterComposition = () => {
	const typedText = useType(sourceText).concat('|');
	const {width, height} = useVideoConfig();

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
