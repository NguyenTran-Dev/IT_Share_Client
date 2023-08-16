import { Avatar, Box, Flex, Tag, Tooltip } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import React, { FC } from 'react';
import LoadingThird from '../../../../components/loading/LoadingThird';

interface IMgsItem {
  message: {
    role: string;
    content: string;
  };
  userInfo?: any;
  isLoading?: boolean;
}

const MgsItem: FC<IMgsItem> = ({ message, userInfo, isLoading }) => {
  return (
    <Flex
      px="1.5rem"
      my="1rem"
      flexDirection={message?.role === 'user' ? 'row-reverse' : 'row'}
    >
      <Box m="0.5rem">
        <Tooltip
          label={message?.role === 'user' ? userInfo?.full_name : message?.role}
          aria-label="A tooltip"
        >
          <Avatar
            size={{ base: 'sm', md: 'md' }}
            name={
              message?.role === 'user' ? userInfo?.full_name : message?.role
            }
            src={
              message?.role === 'user'
                ? ''
                : 'https://cdn.dribbble.com/users/1953813/screenshots/5350927/chatbot-icon.jpg'
            }
            border="0.1rem solid gray"
          />
        </Tooltip>
      </Box>
      <Tag
        borderRadius="0.5rem"
        p="1rem"
        bg={message?.role === 'user' ? 'linkedin.200' : 'white'}
        boxShadow={
          message?.role !== 'user'
            ? '-0.01rem 0.1rem 0.3rem 0.1rem #E2E8F0'
            : 'none'
        }
        maxW="56rem"
        height="fit-content"
      >
        {isLoading ? (
          <Box>
            <Box mt="0.5rem">
              <LoadingThird />
            </Box>
          </Box>
        ) : (
          <MDEditor.Markdown
            source={message?.content ?? ''}
            style={{
              width: '100%',
              backgroundColor: 'unset',
            }}
          />
        )}
      </Tag>
    </Flex>
  );
};

export default MgsItem;
