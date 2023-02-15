// dependencies
import React, { useEffect, useRef, useState } from 'react';
// internals
import { Button, cn, InputSkeleton } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps, RenderableContent } from '@adam-sv/arc';
export interface IFileInputProps extends IARCProps {
  acceptedFileTypes?: string;
  acceptMultipleFiles?: boolean;
  label?: string;
  info?: RenderableContent;
  onChange?: (files: File[]) => unknown;
  value?: File[];
}

export function FileInput(props: IFileInputProps): JSX.Element {
  const [files, setFiles] = useState<File[]>(() => props.value || []);
  const [inputId] = useState(Math.random().toString(36).slice(2, 11));
  const inputRef = useRef<HTMLInputElement>(null);

  function removeFile(index: number) {
    const nextFiles = files.slice();
    nextFiles.splice(index, 1);
    setFiles(nextFiles);
    if (props.onChange) props.onChange(nextFiles);
  }

  return (
    <InputSkeleton
      className={cn('ArcFileInput', props.className)}
      buttonProps={{
        children: files.length < 1 ? 'Upload Files' : 'Change Files',
        onClick: () => inputRef.current?.click(),
      }}
      info={props.info}
      label={props.label || 'File Input'}
      labelHtmlFor={inputId}
    >
      {files.length > 0 ? (
        <div className='file-container'>
          {files.map((file: File, i: number) => (
            <div key={i} className='file-descriptor'>
              <div className='file-name'>{file.name}</div>
              <Button
                className='delete'
                onClick={() => removeFile(i)}
                componentSize='compact'
                type='error'
              >
                &times;
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <label className='withAction' htmlFor={inputId}>
          No file selected...
        </label>
      )}
      <input
        id={inputId}
        accept={props.acceptedFileTypes}
        className='hidden-input'
        multiple={props.acceptMultipleFiles}
        onChange={(e) => {
          if (e.target.files) {
            const files = Array.from(e.target.files);
            setFiles(files);
            if (props.onChange) props.onChange(files);
          }
        }}
        ref={inputRef}
        type='file'
        value={''}
      />
    </InputSkeleton>
  );
}
