import { Textarea } from '@chakra-ui/react';
import React, { FC, HTMLProps } from 'react';
import { Control, Controller } from 'react-hook-form';
interface ITextareaProps extends HTMLProps<HTMLInputElement> {
  name: string;
  control: Control<any>;
  rest?: any;
  placeholder?: string;
  isReadOnly?: boolean;
  resize?: string;
  rows?: number;
}
const TextareaCommon: FC<ITextareaProps> = ({
  name,
  control,
  rest,
  placeholder,
  isReadOnly,
  resize,
  rows,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Textarea
          id={name}
          placeholder={placeholder}
          readOnly={isReadOnly}
          resize={resize}
          rows={rows}
          {...rest}
          {...field}
        />
      )}
    />
  );
};

TextareaCommon.defaultProps = {
  type: 'text',
  placeholder: '',
  isReadOnly: false,
};

export default TextareaCommon;
