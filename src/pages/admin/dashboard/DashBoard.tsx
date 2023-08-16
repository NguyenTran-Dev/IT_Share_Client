import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';

const DashBoard = () => {
  return (
    <Box>
      <Heading fontSize={{ base: '1rem', md: '1.5rem' }} fontWeight="300">
        DashBoard
      </Heading>
      <Box mt="1rem">
        <Button>DashBoard</Button>
      </Box>
    </Box>
  );
};

export default DashBoard;
