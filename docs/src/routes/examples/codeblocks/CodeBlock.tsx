import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import './style.scss';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prism-solarized-dark/prism-solarizeddark.css';

import React, { useState } from 'react';

const getFinalResourcePath = (filepath: string) =>
  `${process.env.PUBLIC_URL || ''}${filepath}`;

const getFileText = async (filepath: string): Promise<string> =>
  await (await fetch(getFinalResourcePath(filepath))).text();

function Component({
  fileName,
  codeString,
  language,
}: {
  fileName?: string;
  codeString?: string;
  language?: string;
}): JSX.Element {
  const [codeBlock, setCodeBlock] = useState<string | undefined>(undefined);

  if (fileName) {
    const getCodeBlockText = async (): Promise<void> =>
      setCodeBlock(await getFileText(fileName));
    void getCodeBlockText();
    language = fileName.split('.')[1];
  } else if (codeString) {
    if (codeBlock !== codeString) {
      setCodeBlock(codeString);
    }
  }

  if (!language?.length) language = 'ts';

  /* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access */
  let highlightFn: (value: string) => React.ReactNode;
  if (language === 'tsx') {
    highlightFn = (code: string) => highlight(code, languages.tsx);
  } else if (language === 'jsx') {
    highlightFn = (code: string) => highlight(code, languages.jsx);
  } else if (language === 'ts') {
    highlightFn = (code: string) => highlight(code, languages.ts);
  } else if (language === 'js') {
    highlightFn = (code: string) => highlight(code, languages.js);
  } else if (language === 'scss') {
    highlightFn = (code: string) => highlight(code, languages.scss);
  } else if (language === 'sass') {
    highlightFn = (code: string) => highlight(code, languages.sass);
  } else if (language === 'css') {
    highlightFn = (code: string) => highlight(code, languages.css);
  } else if (language === 'html') {
    highlightFn = (code: string) => highlight(code, languages.html);
  } else {
    highlightFn = (code: string) => highlight(code);
  }
  /* eslint-enable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access */
  return (
    <div className='ArcCodeBlock'>
      <h3>{fileName}</h3>
      <Editor
        value={codeBlock || ''}
        onValueChange={() => {
          /* do nothing */
        }}
        readOnly
        highlight={highlightFn}
        padding={16}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          // fontSize: 16,
        }}
      />
    </div>
  );
}

export default Component;
