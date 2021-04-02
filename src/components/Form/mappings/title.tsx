// dependencies
import React from 'react';
// internals
import { Title } from '@adam-sv/arc';
// types
import type { IFormSectionTitle, ITitleProps, RenderableContent } from '@adam-sv/arc';

export function renderTitle(formSection: IFormSectionTitle, lifecycleKey: string): RenderableContent {
  const props = formSection.titleComponentProps as ITitleProps || {};

  return <Title
    key={`${lifecycleKey}-${formSection.label}`}
    {...props}
    text={formSection.label}
  />;
}
