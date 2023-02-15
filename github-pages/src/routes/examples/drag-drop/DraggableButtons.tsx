import React, { useState } from 'react';
import {
  Button,
  Panel,
  Title,
  ButtonType,
  Draggable,
  Droppable,
  cn,
} from '@adam-sv/arc';
import './style.scss';
import type { IButtonProps } from '@adam-sv/arc';

const defaultButtons = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
].map((type) => {
  const buttonProps: IButtonProps = {
    type: type as ButtonType,
    onClick: () => {
      console.info(`Type ${type} Button Clicked!`);
    },
    children: `${type.charAt(0).toUpperCase()}${type.slice(1)} Button`,
  };

  return buttonProps;
});

export const DraggableButtons = (): JSX.Element => {
  const [firstPanelButtons, setFirstPanelButtons] =
    useState<IButtonProps[]>(defaultButtons);
  const [secondPanelButtons, setSecondPanelButtons] = useState<IButtonProps[]>(
    []
  );
  const [isFirstPanelHovered, setIsFirstPanelHovered] =
    useState<boolean>(false);
  const [isSecondPanelHovered, setIsSecondPanelHovered] =
    useState<boolean>(false);

  const [buttonBeingDragged, setButtonBeingDragged] = useState<
    IButtonProps | undefined
  >(undefined);

  return (
    <div
      className='draggable-buttons-story'
      style={
        buttonBeingDragged
          ? ({
              '--drag-color': `var(--${
                buttonBeingDragged?.type || 'primary'
              }-components)`,
            } as React.CSSProperties)
          : {}
      }
    >
      <Droppable
        onDrop={(data: string) => {
          setIsFirstPanelHovered(false);
          setButtonBeingDragged(undefined);
          // Note: we lose the "onClick" function in JSON.stringify / parse; use maps and IDs in the real-world
          const { isFirstPanel, ...buttonProps } = JSON.parse(data) as {
            isFirstPanel?: boolean;
          } & IButtonProps;
          const props = buttonProps as IButtonProps;

          if (!isFirstPanel) {
            setSecondPanelButtons(
              secondPanelButtons.filter(
                (p: IButtonProps) =>
                  p.type !==
                  props.type /* eslint-disable-line react/prop-types */ // TODO: upgrade to latest eslint tooling
              )
            );
            setFirstPanelButtons([...firstPanelButtons, props]);
          }
        }}
        onDragOver={() => setIsFirstPanelHovered(true)}
        onDragOut={() => setIsFirstPanelHovered(false)}
      >
        <Panel className={cn(isFirstPanelHovered && 'drag-hover')}>
          <Title titleType={2}>Drag From Here</Title>
          {firstPanelButtons.map((buttonProps: IButtonProps) => {
            return (
              <Draggable
                key={buttonProps.type}
                // Note: we lose the "onClick" function in JSON.stringify / parse; use maps and IDs in the real-world
                data={JSON.stringify({ ...buttonProps, isFirstPanel: true })}
                onDragStart={() => setButtonBeingDragged(buttonProps)}
              >
                <Button {...buttonProps}>{}</Button>
              </Draggable>
            );
          })}
        </Panel>
      </Droppable>

      <Droppable
        onDrop={(data: string) => {
          setIsSecondPanelHovered(false);
          setButtonBeingDragged(undefined);
          // Note: we lose the "onClick" function in JSON.stringify / parse; use maps and IDs in the real-world
          const { isFirstPanel, ...buttonProps } = JSON.parse(data) as {
            isFirstPanel?: boolean;
          } & IButtonProps;
          const props = buttonProps as IButtonProps;
          if (isFirstPanel) {
            setFirstPanelButtons(
              firstPanelButtons.filter(
                (p: IButtonProps) =>
                  p.type !==
                  props.type /* eslint-disable-line react/prop-types */ // TODO: upgrade to latest eslint tooling
              )
            );
            setSecondPanelButtons([...secondPanelButtons, props]);
          }
        }}
        onDragOver={() => setIsSecondPanelHovered(true)}
        onDragOut={() => setIsSecondPanelHovered(false)}
      >
        <Panel className={cn(isSecondPanelHovered && 'drag-hover')}>
          <Title titleType={2}>Drag To Here</Title>
          {secondPanelButtons.map(
            (buttonProps: IButtonProps, index: number) => {
              return (
                <Draggable
                  key={buttonProps.type}
                  // Note: we lose the "onClick" function in JSON.stringify / parse; use maps and IDs in the real-world
                  data={JSON.stringify({ ...buttonProps, isFirstPanel: false })}
                  onDragStart={() => setButtonBeingDragged(buttonProps)}
                >
                  <Button
                    key={`${buttonProps.type || 'noType'}-${index}`}
                    {...buttonProps}
                  />
                </Draggable>
              );
            }
          )}
        </Panel>
      </Droppable>
    </div>
  );
};
