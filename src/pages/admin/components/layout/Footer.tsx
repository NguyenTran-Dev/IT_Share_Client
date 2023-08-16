import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box className="footer" h="100%">
      <Text textAlign="center" color="white" fontSize="0.7rem" py="0.45rem">
        Copyright © 2023 Tran Huu Thuc Nguyen from UIT Teams. All rights
        reserved.
      </Text>
    </Box>
  );
};

export default Footer;
