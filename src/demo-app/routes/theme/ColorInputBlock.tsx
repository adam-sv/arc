import { cn, ColorInput, StringUtils, TextInput, Title } from '@adam-sv/arc';
import { CSSProperties, type JSX } from 'react';
import {
  getInputTextColor,
  getInterpretedColorInputValue,
  getSanitizedColorInputValue,
} from './helpers';

export const getInputStyle = (hex: string): CSSProperties =>
  ({
    backgroundColor: hex,
    '--ArcInput-label-color': getInputTextColor(hex),
    '--ArcInput-text-color': getInputTextColor(hex),
  }) as CSSProperties;

export interface IColorInputBlockProps {
  colorKey: string;
  colorHex: string;
  setColorHex: (colorHex: string) => unknown;
}

export const ColorInputBlock = (props: IColorInputBlockProps): JSX.Element => {
  const { colorKey, colorHex, setColorHex } = props;

  return (
    <div
      className={cn('color-block', colorKey)}
      style={{ gridArea: colorKey }}
      key={`${colorKey}-color-input`}
    >
      <Title titleType={3}>{StringUtils.capitalize(colorKey)}</Title>
      <ColorInput
        label={StringUtils.capitalize(colorKey)}
        onChange={(val) => {
          setColorHex(getSanitizedColorInputValue(`${val}`));
        }}
        value={getInterpretedColorInputValue(colorHex)}
        style={getInputStyle(colorHex)}
      />
      <TextInput
        label={StringUtils.capitalize(colorKey)}
        value={`#${getSanitizedColorInputValue(colorHex)}`}
        onChange={(val) => {
          setColorHex(getSanitizedColorInputValue(`${val}`));
        }}
        style={getInputStyle(colorHex)}
      />
    </div>
  );
};
