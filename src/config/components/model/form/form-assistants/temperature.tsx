import { temperatureAtom } from '@/config/states/plugin';
import { Slider } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';

const marks = [
  {
    value: 0,
    label: 'より厳格',
  },
  {
    value: 2,
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

function TemperatureComponent() {
  const temperature = useAtomValue(temperatureAtom);
  const onTemperatureChange = useSetAtom(handleTemperatureChangeAtom);

  return (
    <div className='px-12 pt-8 w-[400px]'>
      <Slider
        value={temperature}
        onChange={onTemperatureChange}
        step={0.1}
        max={2}
        marks={marks}
        valueLabelDisplay='on'
      />
    </div>
  );
}

export default function Temperature() {
  return <TemperatureComponent />;
}
