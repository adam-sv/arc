import {
  Panel,
  RangeSlider,
  NumberSlider,
  ObjectSlider,
  ObjectSliderOption,
} from '@adam-sv/arc';
import { useState } from 'react';
const options: ObjectSliderOption<number>[] = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];
const VerticalSliderStory = (): JSX.Element => {
  const [sliderValue, setSliderValue] = useState<[number, number]>([3, 7]);
  const [sliderValue2, setSliderValue2] = useState<number>(68);
  const [selectedOption, setSelectedOption] = useState(options[3]);

  return (
    <Panel>
      <RangeSlider
        min={0}
        max={10}
        valueUnitLabel={'days'}
        value={sliderValue}
        isVertical
        title={'Range Slider'}
        onChange={setSliderValue}
      />
      <NumberSlider
        min={0}
        isVertical
        max={100}
        interval={2}
        valueUnitLabel='steps'
        valueUnitLabelSingular='step'
        value={sliderValue2}
        title={'Discrete Number Slider - 2 step'}
        onChange={(value: number) => {
          console.info(`Slider next value: ${value}`);
          setSliderValue2(value);
        }}
      />
      <ObjectSlider
        onChange={(option: ObjectSliderOption<number>) => {
          console.info(`Slider next value: ${option.value}`);
          setSelectedOption(option);
        }}
        options={options}
        title={'Text'}
        value={selectedOption.value}
        isVertical
      />
    </Panel>
  );
};

export default VerticalSliderStory;
