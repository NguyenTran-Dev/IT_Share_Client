import { Avatar, Box, Flex, Tooltip } from '@chakra-ui/react';
import React, { FC } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';

interface IProps {
  author?: string;
  children: ReactElement;
}

const UserComment: FC<IProps> = (props) => {
  const { author, children } = props;
  return (
    <Flex>
      <Tooltip label={author ?? ''} aria-label="A tooltip">
        <Avatar size="sm" name={author ?? ''} border="0.1rem solid gray" />
      </Tooltip>
      <Box ml="1rem" w="100%">
        {children}
      </Box>
    </Flex>
  );
};

export default UserComment;
