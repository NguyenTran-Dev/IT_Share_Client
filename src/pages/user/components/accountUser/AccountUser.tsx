import React from 'react';
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { formatDate } from '../../../../filters/formatDate';

export interface IUserInfo {
  full_name: string;
  updatedAt?: string;
}
const AccountUser: React.FC<{ item: IUserInfo }> = (props) => {
  const { item } = props;

  return (
    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
      <Avatar border="0.1rem solid gray" name={item?.full_name ?? 'AS'} />
      <Box>
        <Heading size="sm">{item?.full_name ?? 'Anonymous'}</Heading>
        {!!item?.updatedAt && (
          <Text fontSize="0.8rem" color={'gray.500'}>
            Updated: {formatDate(item?.updatedAt)}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default AccountUser;
