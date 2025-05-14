import { temperatureAtom } from '@/config/states/plugin';
import { Slider } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { FC } from 'react';

const marks = [
  {
    value: 0,
    label: 'より厳格',
  },
  {
    value: 1,
    label: 'より創造的',
  },
];

const handleTemperatureChangeAtom = atom(null, (_, set, __: unknown, value: number | number[]) => {
  if (typeof value === 'number') {
    set(temperatureAtom, value);
    return;
  }
  set(temperatureAtom, value[0]);
});

const Component: FC = () => {
  const temperature = useAtomValue(temperatureAtom);
  const onTemperatureChange = useSetAtom(handleTemperatureChangeAtom);

  return (
    <div className='px-12 pt-8 w-[400px]'>
      <Slider
        value={temperature}
        onChange={onTemperatureChange}
        step={0.1}
        max={1}
        marks={marks}
        valueLabelDisplay='on'
      />
    </div>
  );
};

const Container: FC = () => {
  return <Component />;
};

export default Container;
