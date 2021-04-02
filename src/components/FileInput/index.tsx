// dependencies
import React, { useRef, useState } from 'react';
// internals
import { Button, cn, InputSkeleton } from '@adam-sv/arc';
// style
import './style.css';
// types
import type { IARCProps, RenderableContent } from '@adam-sv/arc';
export interface IFileInputProps extends IARCProps {
  acceptedFileTypes?: string;
  acceptMultipleFiles?: boolean;
  label?: string;
  info?: RenderableContent;
  onChange: (files: File[]) => unknown;
}

export function FileInput(props: IFileInputProps) {
  const [inputId] = useState(Math.random().toString(36).slice(2, 11));
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function removeFile(index: number) {
    const nextFiles = files.slice();
    nextFiles.splice(index, 1);
    setFiles(nextFiles);
    props.onChange(nextFiles);
  }

  return (
    <div className={cn("ArcFileInput", props.className)}>
      <InputSkeleton
        buttonProps={{
          text: files.length < 1 ? 'Upload Files' : 'Change Files',
          onClick: () => inputRef.current?.click(),
        }}
        info={props.info}
        label={props.label || "File Input"}
        labelHtmlFor={inputId}
        value={files.length > 0
          ? files.map((file: File, i: number) =>
              <div
                key={i}
                className="file-descriptor"
              >
                <div className="file-name">
                  {file.name}
                </div>
                <Button
                  className="delete"
                  onClick={() => removeFile(i)}
                  text="&times;"
                  componentSize="compact"
                  type="error"
                />
              </div>
            )
          : 'No file selected...'
        }
      />
      <input
        id={inputId}
        accept={props.acceptedFileTypes}
        className="hidden-input"
        multiple={props.acceptMultipleFiles}
        onChange={e => {
          if (e.target.files) {
            const files = Array.from(e.target.files);
            setFiles(files);
            props.onChange(files);
          }
        }}
        ref={inputRef}
        type="file"
      />
    </div>
  );
}
