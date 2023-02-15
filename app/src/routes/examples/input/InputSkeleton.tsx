import React from 'react';
import { FileInput, InputSkeleton, Title } from '@adam-sv/arc';

export const InputSkeletons = (): JSX.Element => {
  return (
    <div>
      <Title titleType={4}>Simple</Title>
      <InputSkeleton
        label='No Actual Input is Wired'
        buttonProps={{
          children: 'Integrated button',
          onClick: (e) => console.info({ e }),
        }}
        error='Free error class & message'
        info='Free mouseover, arbitrary content (JSX.Element, string, number) can be passed'
      />
      <Title titleType={4}>Component: FileInput</Title>
      <FileInput
        label='My File Input'
        onChange={(files: File[]) => console.info({ files })}
      />
    </div>
  );
};
