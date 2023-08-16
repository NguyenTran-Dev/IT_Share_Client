import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const InputPassword = (props: any) => {
  const { field } = props;
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        {...field}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? <AiFillEyeInvisible /> : <AiFillEye />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default InputPassword;
