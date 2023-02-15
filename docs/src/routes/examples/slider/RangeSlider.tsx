import { Panel, RangeSlider } from '@adam-sv/arc';
import { useState } from 'react';

const RangeSliderStory = (): JSX.Element => {
  const [sliderValue, setSliderValue] = useState<[number, number]>([3, 7]);
  const [sliderValue2, setSliderValue2] = useState<[number, number]>([68, 73]);
  const [sliderValue3, setSliderValue3] = useState<[number, number]>([
    400, 800,
  ]);

  return (
    <Panel>
      <RangeSlider
        min={0}
        max={10}
        valueUnitLabel={'days'}
        value={sliderValue}
        title={'Range Slider'}
        onChange={setSliderValue}
      />

      <RangeSlider
        min={0}
        max={100}
        interval={2}
        valueUnitLabel={'sheckles'}
        value={sliderValue2}
        title={'Money'}
        onChange={setSliderValue2}
      />
      <RangeSlider
        min={123}
        max={1329}
        interval={7}
        valueUnitLabel={'horsepower'}
        value={sliderValue3}
        title={'Power'}
        onChange={setSliderValue3}
      />
    </Panel>
  );
};

export default RangeSliderStory;
