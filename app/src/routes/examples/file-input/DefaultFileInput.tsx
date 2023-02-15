import React, { useState } from 'react';
import { Panel, FileInput } from '@adam-sv/arc';

export default function DefaultFileInput(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Panel>
      <FileInput
        label='My File Input'
        onChange={(files) => {
          console.info({ files });
          setFiles(files);
        }}
        acceptMultipleFiles
        info='Does this move the X nicely?'
      />
      <div style={{ minHeight: (1 + files.length) * 18 }}>
        <i>Selected files:</i>
        {files.length < 1 && '-'}
        {files.map((f, i) => (
          <div key={i}>{f.name}</div>
        ))}
      </div>
    </Panel>
  );
}
