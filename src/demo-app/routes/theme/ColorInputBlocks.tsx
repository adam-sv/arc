import { useEffect, useState, type JSX } from 'react';
import { IThemeHexes } from 'src/lib/utils/theme';
import { ColorInputBlock } from './ColorInputBlock';
import { getInterpretedColorInputValue } from './helpers';

export interface IColorInputBlocksProps {
  hexes: IThemeHexes;
  onChange: (hexes: IThemeHexes) => unknown;
}

export const ColorInputBlocks = (
  props: IColorInputBlocksProps
): JSX.Element => {
  const { hexes, onChange } = props;
  const [backgroundHex, setBackgroundHex] = useState<string>(hexes.background);
  const [surfaceHex, setSurfaceHex] = useState<string>(hexes.surface);
  const [borderHex, setBorderHex] = useState<string>(hexes.border);
  const [primaryHex, setPrimaryHex] = useState<string>(hexes.primary);
  const [secondaryHex, setSecondaryHex] = useState<string>(hexes.secondary);
  const [tertiaryHex, setTertiaryHex] = useState<string>(hexes.tertiary);
  const [lightHex, setLightHex] = useState<string>(hexes.light);
  const [mediumHex, setMediumHex] = useState<string>(hexes.medium);
  const [darkHex, setDarkHex] = useState<string>(hexes.dark);
  const [dangerHex, setDangerHex] = useState<string>(hexes.danger);
  const [warningHex, setWarningHex] = useState<string>(hexes.warning);
  const [successHex, setSuccessHex] = useState<string>(hexes.success);

  // palette
  const [redHex, setRedHex] = useState<string>(hexes.red);
  const [orangeHex, setOrangeHex] = useState<string>(hexes.orange);
  const [yellowHex, setYellowHex] = useState<string>(hexes.yellow);
  const [chartreuseHex, setChartreuseHex] = useState<string>(hexes.chartreuse);
  const [greenHex, setGreenHex] = useState<string>(hexes.green);
  const [emeraldHex, setEmeraldHex] = useState<string>(hexes.emerald);
  const [tealHex, setTealHex] = useState<string>(hexes.teal);
  const [blueHex, setBlueHex] = useState<string>(hexes.blue);
  const [indigoHex, setIndigoHex] = useState<string>(hexes.indigo);
  const [purpleHex, setPurpleHex] = useState<string>(hexes.purple);
  const [pinkHex, setPinkHex] = useState<string>(hexes.pink);
  const [magentaHex, setMagentaHex] = useState<string>(hexes.magenta);

  useEffect(() => {
    const {
      background,
      surface,
      border,
      primary,
      secondary,
      tertiary,
      light,
      medium,
      dark,
      danger,
      warning,
      success,
      red,
      orange,
      yellow,
      chartreuse,
      green,
      emerald,
      teal,
      blue,
      indigo,
      purple,
      pink,
      magenta,
    } = hexes;

    if (background != backgroundHex) setBackgroundHex(background);
    if (surface != surfaceHex) setSurfaceHex(surface);
    if (border != borderHex) setBorderHex(border);
    if (primary != primaryHex) setPrimaryHex(primary);
    if (secondary != secondaryHex) setSecondaryHex(secondary);
    if (tertiary != tertiaryHex) setTertiaryHex(tertiary);
    if (light != lightHex) setLightHex(light);
    if (medium != mediumHex) setMediumHex(medium);
    if (dark != darkHex) setDarkHex(dark);
    if (danger != dangerHex) setDangerHex(danger);
    if (warning != warningHex) setWarningHex(warning);
    if (success != successHex) setSuccessHex(success);

    if (red != redHex) setRedHex(red);
    if (orange != orangeHex) setOrangeHex(orange);
    if (yellow != yellowHex) setYellowHex(yellow);
    if (chartreuse != chartreuseHex) setChartreuseHex(chartreuse);
    if (green != greenHex) setGreenHex(green);
    if (emerald != emeraldHex) setEmeraldHex(emerald);
    if (teal != tealHex) setTealHex(teal);
    if (blue != blueHex) setBlueHex(blue);
    if (indigo != indigoHex) setIndigoHex(indigo);
    if (purple != purpleHex) setPurpleHex(purple);
    if (pink != pinkHex) setPinkHex(pink);
    if (magenta != magentaHex) setMagentaHex(magenta);
  }, [
    hexes,
    backgroundHex,
    surfaceHex,
    borderHex,
    primaryHex,
    secondaryHex,
    tertiaryHex,
    lightHex,
    mediumHex,
    darkHex,
    dangerHex,
    warningHex,
    successHex,
    redHex,
    orangeHex,
    yellowHex,
    chartreuseHex,
    greenHex,
    emeraldHex,
    tealHex,
    blueHex,
    indigoHex,
    purpleHex,
    pinkHex,
    magentaHex,
  ]);

  return (
    <>
      <ColorInputBlock
        colorKey='primary'
        colorHex={primaryHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, primary: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='secondary'
        colorHex={secondaryHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, secondary: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='tertiary'
        colorHex={tertiaryHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, tertiary: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='background'
        colorHex={backgroundHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, background: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='surface'
        colorHex={surfaceHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, surface: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='border'
        colorHex={borderHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, border: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='light'
        colorHex={lightHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, light: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='medium'
        colorHex={mediumHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, medium: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='dark'
        colorHex={darkHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, dark: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='success'
        colorHex={successHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, success: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='warning'
        colorHex={warningHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, warning: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='danger'
        colorHex={dangerHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, danger: getInterpretedColorInputValue(hex) })
        }
      />

      <ColorInputBlock
        colorKey='red'
        colorHex={redHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, red: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='orange'
        colorHex={orangeHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, orange: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='yellow'
        colorHex={yellowHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, yellow: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='chartreuse'
        colorHex={chartreuseHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, chartreuse: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='green'
        colorHex={greenHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, green: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='emerald'
        colorHex={emeraldHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, emerald: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='teal'
        colorHex={tealHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, teal: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='blue'
        colorHex={blueHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, blue: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='indigo'
        colorHex={indigoHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, indigo: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='purple'
        colorHex={purpleHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, purple: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='pink'
        colorHex={pinkHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, pink: getInterpretedColorInputValue(hex) })
        }
      />
      <ColorInputBlock
        colorKey='magenta'
        colorHex={magentaHex}
        setColorHex={(hex) =>
          onChange({ ...hexes, magenta: getInterpretedColorInputValue(hex) })
        }
      />
    </>
  );
};
