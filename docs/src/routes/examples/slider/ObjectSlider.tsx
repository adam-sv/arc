import { useState } from 'react';
import { ObjectSlider, ObjectSliderOption, Panel } from '@adam-sv/arc';

const options: ObjectSliderOption<number>[] = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];

export default function TextSliderStory(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState(options[3]);

  return (
    <Panel>
      <ObjectSlider
        onChange={(option: ObjectSliderOption<number>) => {
          console.info(`Slider next value: ${option.value}`);
          setSelectedOption(option);
        }}
        options={options}
        title={'Text'}
        value={selectedOption.value}
      />
    </Panel>
  );
}
