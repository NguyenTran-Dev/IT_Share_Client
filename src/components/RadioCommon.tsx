import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

interface IOption {
  key: number;
  title: string;
  value: string;
}

interface IRadioProps {
  name: string;
  control: Control<any>;
  options: IOption[];
  direction?: 'row' | 'column';
  defaultValue?: string;
}

const RadioCommon: FC<IRadioProps> = ({
  name,
  control,
  options,
  direction,
  defaultValue,
}) => {
  const renderOptions = useCallback(() => {
    return options.map((item: IOption) => {
      return (
        <Radio key={item.key} value={item.value}>
          {item.title}
        </Radio>
      );
    });
  }, [options]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <RadioGroup value={value} onChange={onChange}>
          <Stack direction={direction} justifyContent="space-around">
            {renderOptions()}
          </Stack>
        </RadioGroup>
      )}
    />
  );
};

RadioCommon.defaultProps = {
  direction: 'row',
  defaultValue: '',
};

export default RadioCommon;
