import {
  THEMES,
  Panel,
  Button,
  Title,
  Modal,
  useModal,
  ThemeUtils,
} from '@adam-sv/arc';
import { useEffect, useState, type JSX } from 'react';
import './style.scss';
import CodeBlock from './../examples/codeblocks/CodeBlock';
import { AppRootElementId } from 'arc-demo-app';
import { ColorInputBlocks } from './ColorInputBlocks';

export interface IThemeRouteProps {
  inputHexes: ThemeUtils.IThemeInputHexes;
  didGenerateThemeHexes: (themeHexes: ThemeUtils.IThemeHexes) => void;
}

export const ThemeRoute = (props: IThemeRouteProps): JSX.Element => {
  const { didGenerateThemeHexes, inputHexes } = props;
  const [codeModalIsOpen, setCodeModalOpen] = useModal();
  const [hexes, setHexes] = useState<ThemeUtils.IThemeHexes>(
    ThemeUtils.getThemeHexesFromInput(inputHexes)
  );

  const [themeCSSVariableString, setThemeCSSVariableString] = useState<string>(
    ThemeUtils.generateThemeVariableString(inputHexes)
  );

  useEffect(() => {
    didGenerateThemeHexes(hexes);
    setThemeCSSVariableString(ThemeUtils.generateThemeVariableString(hexes));
  }, [hexes, didGenerateThemeHexes]);

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
          <Button
            onClick={() => {
              setCodeModalOpen(true);
            }}
          >
            Show CSS Variables
          </Button>
        </div>
        <div className='button-row'>
          <Button
            onClick={() => {
              setHexes(THEMES.DEFAULT);
            }}
          >
            Default Theme
          </Button>
          <Button
            onClick={() => {
              setHexes(THEMES.DARK);
            }}
          >
            Dark Theme
          </Button>
        </div>
        <div className='button-row'>
          <Button
            onClick={() => {
              setHexes(
                ThemeUtils.generateHexesBasedOnPrimary(hexes.primary, false)
              );
            }}
          >
            Auto Light
          </Button>

          <Button
            onClick={() => {
              setHexes(
                ThemeUtils.generateHexesBasedOnPrimary(hexes.primary, true)
              );
            }}
          >
            Auto Dark
          </Button>
        </div>

        <div className='input-grid'>
          <ColorInputBlocks hexes={hexes} onChange={setHexes} />
        </div>
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
      </Panel>
    </div>
  );
};
