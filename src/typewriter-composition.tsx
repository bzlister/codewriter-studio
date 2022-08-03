import React, { useEffect, useState } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import ReactMarkdown from "react-markdown";
import { Prism, createElement } from "react-syntax-highlighter";
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Cursor } from "react-simple-typewriter";

const sourceText = `
class MyApp extends StatelessWidget {
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
}
`;
const char_per_frame = 1;

export const TypewriterComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [offset, setOffset] = useState(0);


  useEffect(() => {
    if (sourceText.charAt(frame + offset) === '\n') {
      let i = 1;
      while ((frame + offset + i) < sourceText.length && sourceText.charAt(frame + offset + i).trim() === "") {
        i += 1;
      }
      setOffset(offset + i);
    }
  }, [frame]);

  const typedText = sourceText.substring(0, frame + offset).concat('|');

  return <ReactMarkdown children={`~~~dart\n${typedText}\n~~~`} components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <Prism
          children={String(children).replace(/\n$/, '')}
          style={xonokai}
          language={match[1]}
          PreTag="div"
          {...props}

        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }} />;
};
/*
          renderer={(props) => (<>
            {props.rows.map(node => createElement({ node, stylesheet: props.stylesheet, useInlineStyles: props.useInlineStyles, key: undefined }))}
            <Cursor />
          </>)}

          */