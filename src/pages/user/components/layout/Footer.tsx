import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box mt="3rem" className="footer">
      <Container maxW="70rem">
        <Text textAlign="center" color="white" fontSize="0.7rem">
          © 2023 Tran Huu Thuc Nguyen from UIT Teams. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
