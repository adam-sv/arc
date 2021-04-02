export interface IMenuItem {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: IMenuItem) => void;
  icon?: JSX.Element;
  label?: JSX.Element;
  shortcut?: JSX.Element;
}
