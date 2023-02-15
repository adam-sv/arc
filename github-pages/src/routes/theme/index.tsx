import {
  ColorInput,
  THEMES,
  Panel,
  Button,
  ColorUtils,
  cn,
  TextInput,
  StringUtils,
  Title,
  Modal,
  useModal,
  ThemeUtils,
} from '@adam-sv/arc';
import { CSSProperties, useEffect, useState } from 'react';
import './style.scss';
import CodeBlock from './../examples/codeblocks/CodeBlock';
import { AppRootElementId } from 'src/app';

const getInputTextColor = (bgColor: string): string =>
  ColorUtils.computeTextColorBasedOnBackground(bgColor, 'white', 'black');

const getSanitizedColorInputValue = (
  colorValueString: string | undefined
): string =>
  StringUtils.stripNonHexidecimal(
    (colorValueString || '').toLowerCase().slice(0, 7)
  );

const getInterpretedColorInputValue = (
  colorValueString: string | undefined
): string => {
  colorValueString = getSanitizedColorInputValue(colorValueString);
  if (colorValueString.length === 4) {
    // if the string is 4 chars long, the last char is interpreted as alpha
    // alpha isn't supported by native color picker, so disregard it    colorValueString = colorValueString.slice(0, 3);
    colorValueString = colorValueString.slice(0, 3);
  }

  if (colorValueString.length === 3) {
    // if the string is 3 chars long, each char is copied
    colorValueString =
      colorValueString.charAt(0) +
      colorValueString.charAt(0) +
      colorValueString.charAt(1) +
      colorValueString.charAt(1) +
      colorValueString.charAt(2) +
      colorValueString.charAt(2);
  }
  return `#${colorValueString}`;
};

const getInputStyle = (themeColor: string): CSSProperties =>
  ({
    backgroundColor: themeColor,
    '--ArcInput-label-color': getInputTextColor(themeColor),
    '--ArcInput-text-color': getInputTextColor(themeColor),
  } as CSSProperties);

function Component(props: {
  themeProps: ThemeUtils.IThemeProps;
  setThemeProps: (themeProps: ThemeUtils.IThemeProps) => void;
}): JSX.Element {
  const { themeProps, setThemeProps } = props;
  const [codeModalIsOpen, setCodeModalOpen] = useModal();
  const [paletteModalIsOpen, setPaletteModalOpen] = useModal();

  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    themeProps.background
  );
  const [surfaceColor, setSurfaceColor] = useState<string | undefined>(
    themeProps.surface
  );
  const [borderColor, setBorderColor] = useState<string | undefined>(
    themeProps.border
  );
  const [primaryColor, setPrimaryColor] = useState<string | undefined>(
    themeProps.primary
  );
  const [secondaryColor, setSecondaryColor] = useState<string | undefined>(
    themeProps.secondary
  );
  const [tertiaryColor, setTertiaryColor] = useState<string | undefined>(
    themeProps.tertiary
  );
  const [lightColor, setLightColor] = useState<string | undefined>(
    themeProps.light
  );
  const [mediumColor, setMediumColor] = useState<string | undefined>(
    themeProps.medium
  );
  const [darkColor, setDarkColor] = useState<string | undefined>(
    themeProps.dark
  );
  const [dangerColor, setDangerColor] = useState<string | undefined>(
    themeProps.danger
  );
  const [warningColor, setWarningColor] = useState<string | undefined>(
    themeProps.warning
  );
  const [successColor, setSuccessColor] = useState<string | undefined>(
    themeProps.success
  );

  const [themeCSSVariableString, setThemeCSSVariableString] = useState<string>(
    ThemeUtils.generateThemeVariableString(themeProps)
  );

  const apply = () => {
    const statefulThemeProps: ThemeUtils.IThemeProps = {
      background: getInterpretedColorInputValue(backgroundColor),
      surface: getInterpretedColorInputValue(surfaceColor),
      border: getInterpretedColorInputValue(borderColor),
      primary: getInterpretedColorInputValue(primaryColor),
      secondary: getInterpretedColorInputValue(secondaryColor),
      tertiary: getInterpretedColorInputValue(tertiaryColor),
      light: getInterpretedColorInputValue(lightColor),
      medium: getInterpretedColorInputValue(mediumColor),
      dark: getInterpretedColorInputValue(darkColor),
      danger: getInterpretedColorInputValue(dangerColor),
      warning: getInterpretedColorInputValue(warningColor),
      success: getInterpretedColorInputValue(successColor),
    };

    if (
      JSON.stringify(ThemeUtils.getThemeFromProps(statefulThemeProps)) !==
      JSON.stringify(ThemeUtils.getThemeFromProps(themeProps))
    ) {
      setThemeProps(statefulThemeProps);
      setThemeCSSVariableString(
        ThemeUtils.generateThemeVariableString(statefulThemeProps)
      );
    }
  };
  useEffect(() => apply());

  const setPremadeTheme = (theme: ThemeUtils.ITheme) => {
    setBackgroundColor(theme.background);
    setSurfaceColor(theme.surface);
    setBorderColor(theme.border);
    setPrimaryColor(theme.primary);
    setSecondaryColor(theme.secondary);
    setTertiaryColor(theme.tertiary);
    setLightColor(theme.light);
    setMediumColor(theme.medium);
    setDarkColor(theme.dark);
    setDangerColor(theme.danger);
    setWarningColor(theme.warning);
    setSuccessColor(theme.success);
  };

  const getInputsForColorKey = (
    colorKey: string,
    colorValue: string | undefined,
    setColorValue: (colorValue: string | undefined) => unknown,
    colorThemeValue: string | undefined
  ) => {
    return (
      <div
        className={cn('color-block', colorKey)}
        key={`${colorKey}-color-input`}
      >
        <Title titleType={3}>{StringUtils.capitalize(colorKey)}</Title>
        <ColorInput
          label={StringUtils.capitalize(colorKey)}
          onChange={(val) => {
            setColorValue(getSanitizedColorInputValue(`${val}`));
          }}
          value={getInterpretedColorInputValue(colorValue || '')}
          style={getInputStyle(colorThemeValue || '')}
        />
        <TextInput
          label={StringUtils.capitalize(colorKey)}
          value={`#${getSanitizedColorInputValue(colorValue)}`}
          onChange={(val) => {
            setColorValue(getSanitizedColorInputValue(`${val}`));
          }}
          style={getInputStyle(colorThemeValue || '')}
        />
      </div>
    );
  };

  const inputs = [
    getInputsForColorKey(
      'primary',
      primaryColor,
      setPrimaryColor,
      ThemeUtils.getThemeFromProps(themeProps).primary
    ),
    getInputsForColorKey(
      'secondary',
      secondaryColor,
      setSecondaryColor,
      ThemeUtils.getThemeFromProps(themeProps).secondary
    ),
    getInputsForColorKey(
      'tertiary',
      tertiaryColor,
      setTertiaryColor,
      ThemeUtils.getThemeFromProps(themeProps).tertiary
    ),
    getInputsForColorKey(
      'background',
      backgroundColor,
      setBackgroundColor,
      ThemeUtils.getThemeFromProps(themeProps).background
    ),
    getInputsForColorKey(
      'surface',
      surfaceColor,
      setSurfaceColor,
      ThemeUtils.getThemeFromProps(themeProps).surface
    ),
    getInputsForColorKey(
      'border',
      borderColor,
      setBorderColor,
      ThemeUtils.getThemeFromProps(themeProps).border
    ),
    getInputsForColorKey(
      'light',
      lightColor,
      setLightColor,
      ThemeUtils.getThemeFromProps(themeProps).light
    ),
    getInputsForColorKey(
      'medium',
      mediumColor,
      setMediumColor,
      ThemeUtils.getThemeFromProps(themeProps).medium
    ),
    getInputsForColorKey(
      'dark',
      darkColor,
      setDarkColor,
      ThemeUtils.getThemeFromProps(themeProps).dark
    ),
    getInputsForColorKey(
      'success',
      successColor,
      setSuccessColor,
      ThemeUtils.getThemeFromProps(themeProps).success
    ),
    getInputsForColorKey(
      'warning',
      warningColor,
      setWarningColor,
      ThemeUtils.getThemeFromProps(themeProps).warning
    ),
    getInputsForColorKey(
      'danger',
      dangerColor,
      setDangerColor,
      ThemeUtils.getThemeFromProps(themeProps).danger
    ),
  ];

  const palette =
    primaryColor && ThemeUtils.generatePalette(primaryColor, surfaceColor);

  return (
    <div className='theme-view'>
      <Panel>
        <div className='button-row'>
          <Button
            onClick={() =>
              navigator.clipboard.writeText(themeCSSVariableString)
            }
          >
            Copy to Clipboard
          </Button>
          <Button onClick={() => setCodeModalOpen(true)}>
            Show CSS Variables
          </Button>
          <Button onClick={() => setPaletteModalOpen(true)}>
            Show Palette
          </Button>
        </div>
        <div className='button-row'>
          <Button onClick={() => setPremadeTheme(THEMES.DEFAULT)}>
            Default Theme
          </Button>
          <Button onClick={() => setPremadeTheme(THEMES.DARK)}>
            Dark Theme
          </Button>
        </div>
        <div className='button-row'>
          <Button
            onClick={() =>
              primaryColor &&
              setPremadeTheme(
                ThemeUtils.generateQuickTheme(primaryColor, false)
              )
            }
            className={cn(!primaryColor && 'disabled')}
          >
            Auto Light
          </Button>

          <Button
            onClick={() =>
              primaryColor &&
              setPremadeTheme(ThemeUtils.generateQuickTheme(primaryColor, true))
            }
            className={cn(!primaryColor && 'disabled')}
          >
            Auto Dark
          </Button>
        </div>

        <div className='input-grid'>{inputs}</div>
        <Modal
          className='css-variable-modal'
          isOpen={codeModalIsOpen}
          setIsOpen={setCodeModalOpen}
          portalTargetElement={document.getElementById(AppRootElementId)}
        >
          <Title titleType={2}>CSS Variables</Title>
          <CodeBlock
            codeString={themeCSSVariableString}
            language='css'
          ></CodeBlock>
        </Modal>
        <Modal
          className='palette-modal'
          isOpen={paletteModalIsOpen}
          setIsOpen={setPaletteModalOpen}
          portalTargetElement={document.getElementById(AppRootElementId)}
        >
          <Title titleType={2}>Palette</Title>
          <div className='palette'>
            {palette &&
              palette.map((c: ThemeUtils.IThemeColor) => {
                const colorName = StringUtils.capitalize(
                  c.id.replace('palette-', '')
                );

                return (
                  <div
                    key={c.id}
                    className={cn('palette-item')}
                    style={{
                      backgroundColor: c.hex,
                      color: c.text,
                    }}
                  >
                    <span>{colorName}:</span>
                    <span style={{ color: c.text }}>{c.hex}</span>
                  </div>
                );
              })}
          </div>
        </Modal>
      </Panel>
    </div>
  );
}

export default Component;
