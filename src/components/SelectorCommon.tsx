/* eslint-disable no-unused-vars */
import { Select } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  onSelect: (selectedOption: string | number | boolean) => void;
  placeholder?: string;
};

const SelectCommon: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      setSelectedOption(selectedOption);
      onSelect(selectedOption.value);
    }
  };

  const renderOptions = useCallback(() => {
    return options.map((item: any) => {
      return (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      );
    });
  }, []);

  return (
    <Select
      value={selectedOption ? selectedOption.value : ''}
      onChange={handleSelect}
      placeholder={placeholder}
    >
      {renderOptions()}
    </Select>
  );
};

export default SelectCommon;
