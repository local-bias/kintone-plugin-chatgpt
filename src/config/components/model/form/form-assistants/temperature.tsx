import React, { FC } from 'react';
import { Slider } from '@mui/material';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { temperatureState } from '@/config/states/plugin';

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

const Component: FC = () => {
  const temperature = useRecoilValue(temperatureState);

  const onTemperatureChange = useRecoilCallback(
    ({ set }) =>
      (_: any, t: number | number[]) => {
        if (typeof t === 'number') {
          set(temperatureState, t);
          return;
        }
        set(temperatureState, t[0]);
      },
    []
  );

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
