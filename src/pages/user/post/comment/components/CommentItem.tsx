import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import UserComment from './UserComment';
import { IComment } from '../../../../../interfaces';
import { AiOutlineDelete, AiOutlineMore } from 'react-icons/ai';
import { getSession } from '../../../../../filters/servicesSession';

interface Props {
  item: IComment;
  onDelete: () => void;
}

const CommentItem: FC<Props> = (props) => {
  const { item, onDelete } = props;
  const userInfo = getSession('user-info');

  return (
    <UserComment author={item?.full_name ?? ''}>
      <>
        <Flex>
          <Box
            maxW={{ base: '13rem', md: 'fit-content' }}
            bg="blackAlpha.100"
            p="0.2rem 0.5rem"
            borderRadius="0.5rem"
          >
            <Text>{item?.comment ?? ''}</Text>
          </Box>
          {(userInfo?._id === item?.user_id || userInfo?.role === 1) && (
            <Menu isLazy>
              <MenuButton>
                <AiOutlineMore />
              </MenuButton>
              <MenuList minW="fit-content">
                <MenuItem color="red" onClick={onDelete}>
                  <AiOutlineDelete />
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </>
    </UserComment>
  );
};

export default CommentItem;
