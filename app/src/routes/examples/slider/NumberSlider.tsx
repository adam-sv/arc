import { NumberSlider, Panel } from '@adam-sv/arc';
import { useState } from 'react';

const NumberSliderStory = (): JSX.Element => {
  const [sliderValue1, setSliderValue1] = useState(48);
  const [sliderValue2, setSliderValue2] = useState(66);
  const [sliderValue3, setSliderValue3] = useState(125);
  const [sliderValue4, setSliderValue4] = useState(36);

  return (
    <Panel>
      <NumberSlider
        min={0}
        max={100}
        interval={2}
        valueUnitLabel='steps'
        valueUnitLabelSingular='step'
        value={sliderValue1}
        title={'Discrete Number Slider - 2 step'}
        onChange={(value: number) => {
          console.info(`Slider next value: ${value}`);
          setSliderValue1(value);
        }}
      />
      <NumberSlider
        min={1}
        max={100}
        interval={2}
        valueUnitLabel='steps'
        valueUnitLabelSingular='step'
        value={sliderValue4}
        title={'Discrete Number Slider - 2 step, odd'}
        onChange={setSliderValue4}
      />
      <NumberSlider
        min={1}
        max={100}
        interval={0.1}
        valueUnitLabel='steps'
        valueUnitLabelSingular='step'
        value={sliderValue2}
        title={'Discrete Number Slider - 0.1 step'}
        onChange={setSliderValue2}
      />
      <NumberSlider
        min={47}
        max={239}
        interval={7}
        valueUnitLabel='steps'
        valueUnitLabelSingular='step'
        value={sliderValue3}
        title={'Discrete Number Slider - 7 step'}
        onChange={setSliderValue3}
      />
    </Panel>
  );
};

export default NumberSliderStory;
