// dependencies
import React from "react";
// internals
import { Title } from '@adam-sv/arc';
import { StoryContainer } from './StoryContainer';

export function StoryVariableDisplay({ vars }: { vars: object }): JSX.Element {
  return (
    <StoryContainer style={{ minWidth: '300px' }}>
      <div
        className="StoryContainer-variableDisplay"
        style={{
          background: 'var(--surface)',
          color: 'var(--on-surface)',
          padding: 'calc(2 * var(--ARC-sizing-verticalSpace)) var(--ARC-sizing-horizontalSpace)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          overflow: 'auto',
          margin: '20px',
          maxWidth: '600px',
        }}
      >
        <Title titleType={2} text="Variables" />
        <div
          style={{
            color: 'var(--color-border-dark)',
            marginBottom: 'calc(2 * var(--ARC-sizing-verticalSpace)',
            marginTop: 'calc(-1 * var(--ARC-sizing-verticalSpace)',
          }}>
          0.1.0
        </div>
        <div className="text">
          What follows is a selection of some variables that were used in this component, printed with JSON.stringify.
        </div>
        {Object.entries(vars).map(([key, value]) => [
          <Title titleType={4} text={key} />,
          <div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
            {JSON.stringify(value, null, 2)}
          </div>,
        ])}
      </div>
    </StoryContainer>
  );
}
