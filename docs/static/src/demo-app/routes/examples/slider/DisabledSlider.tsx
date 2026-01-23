import {
  Panel,
  RangeSlider,
  NumberSlider,
  ObjectSlider,
  ObjectSliderOption,
} from '@adam-sv/arc';
import { useState, type JSX } from 'react';
const options: ObjectSliderOption<number>[] = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];
const DisabledSliderStory = (): JSX.Element => {
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
        title={'Range Slider'}
        onChange={setSliderValue}
        disableSlider
      />
      <NumberSlider
        min={0}
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
        disableSlider
      />
      <ObjectSlider
        onChange={(option: ObjectSliderOption<number>) => {
          console.info(`Slider next value: ${option.value}`);
          setSelectedOption(option);
        }}
        options={options}
        title={'Text'}
        value={selectedOption.value}
        disableSlider
      />
    </Panel>
  );
};

export default DisabledSliderStory;
