import { PinnedPanel, Button, useClickOutsideDetector } from '@adam-sv/arc';
import type { IColumnDefinition } from '@adam-sv/arc';
import { useRef, useState } from 'react';

const MultiHeader = <T,>(props: {
  selectedColumn: IColumnDefinition<T>;
  didSelectColumn: (c: IColumnDefinition<T>) => void;
  columns: IColumnDefinition<T>[];
}) => {
  const { selectedColumn, didSelectColumn, columns } = props;
  const shownColumn =
    columns.find((c) => c.title === selectedColumn.title) || columns[0];
  const headerRef = useRef<HTMLDivElement>(null);

  useClickOutsideDetector<HTMLDivElement>(headerRef, () => {
    setShowColumnSelect(false);
  });

  const [showColumnSelect, setShowColumnSelect] = useState<boolean>(false);

  const columnSelectButtonList = columns.map(
    (c: IColumnDefinition<T>, index: number) => {
      return (
        <Button
          key={`column-select-${index}`}
          onClick={() => {
            didSelectColumn(c);
            setShowColumnSelect(false);
          }}
        >
          {c.title}
        </Button>
      );
    }
  );
  return (
    <div
      className='ArcTable-MultiHeader'
      ref={headerRef}
      onClick={(ev) => {
        ev.stopPropagation(); // stops click event from bubbling up and causing a sort-direction change
        setShowColumnSelect(!showColumnSelect);
      }}
    >
      {shownColumn.headerContentGenerator
        ? shownColumn.headerContentGenerator(shownColumn)
        : shownColumn.title || ''}
      <PinnedPanel
        isOpen={showColumnSelect}
        element={headerRef.current}
        anchor='bottom-right'
      >
        {columnSelectButtonList}
      </PinnedPanel>
    </div>
  );
};

export default MultiHeader;
