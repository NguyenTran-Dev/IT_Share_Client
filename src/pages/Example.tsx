import * as React from 'react';
import { Container, Input, List, ListItem } from '@chakra-ui/react';
import { FormControl } from '../components';

const Example = () => {
  const commons = [
    {
      title: 'Form Control',
      el: (
        <FormControl
          label="Email"
          require
          errorMessage="Email invalid"
          helperText="input"
        >
          <Input />
        </FormControl>
      ),
    },
  ];
  const renderCommon = () => {
    return commons.map((item) => {
      return (
        <ListItem key={item.title}>
          <h2>{item.title}</h2>
          {item.el}
        </ListItem>
      );
    });
  };
  return (
    <Container maxW="xxl" className="mock">
      <h1 className="text-center">Mocks</h1>
      <List>{renderCommon()}</List>
    </Container>
  );
};

export default Example;
