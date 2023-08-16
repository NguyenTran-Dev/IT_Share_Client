import { Input } from '@chakra-ui/react';
import React, { FC, HTMLProps } from 'react';
import { Control, Controller } from 'react-hook-form';
interface IInputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  type?: 'text' | 'email' | 'number' | 'password';
  control: Control<any>;
  rest?: any;
  placeholder?: string;
  isReadOnly?: boolean;
}
const InputCommon: FC<IInputProps> = ({
  name,
  type,
  control,
  rest,
  placeholder,
  isReadOnly,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          readOnly={isReadOnly}
          {...rest}
          {...field}
        />
      )}
    />
  );
};

InputCommon.defaultProps = {
  type: 'text',
  placeholder: '',
  isReadOnly: false,
};

export default InputCommon;
