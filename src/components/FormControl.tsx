import React, { ReactElement } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
export interface IFormControl {
  label: string;
  errorMessage?: string; // message validator
  helperText?: string; // message helper
  children: ReactElement;
  require?: boolean;
}
const FormControlCommon = (props: IFormControl) => {
  const { label, errorMessage, require, helperText, children } = props;

  return (
    <FormControl
      isRequired={require}
      px={4}
      my="1rem"
      isInvalid={!!errorMessage}
    >
      <FormLabel>{label}</FormLabel>
      {children}
      {!errorMessage ? (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};

FormControlCommon.defaultProps = {
  require: false,
  helperText: '',
};

export default FormControlCommon;
