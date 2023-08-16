import {
  Avatar,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { logOut } from '../filters/logOut';
import { getSession } from '../filters/servicesSession';

const ProfileMenu = () => {
  const infoUser = getSession('user-info');

  return (
    <Menu>
      <MenuButton>
        <Avatar
          border="0.1rem solid gray"
          name={infoUser?.full_name ?? 'Anonymous'}
        />
      </MenuButton>
      <MenuList>
        <Flex flex="1" gap="4" p="3" alignItems="center" flexWrap="wrap">
          <Avatar
            border="0.1rem solid gray"
            name={infoUser?.full_name ?? 'Anonymous'}
          />
          <Heading size="sm">{infoUser?.full_name ?? 'Anonymous'}</Heading>
        </Flex>
        <MenuDivider />
        <MenuGroup title="Profile">
          <MenuItem>
            <Link to={ROUTES.MYPOST}>My Account</Link>
          </MenuItem>
          <MenuItem>Payments </MenuItem>
          <MenuItem onClick={logOut} color="red">
            Log out
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
