import React, { useState } from 'react';
import { Box, List, ListItem, Text } from '@chakra-ui/react';
import {
  AiFillRobot,
  AiFillSnippets,
  AiOutlineUser,
  AiTwotoneHome,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../config/routes';

const NavBar = () => {
  const listItem = [
    {
      key: 1,
      title: 'Dashboard',
      link: ROUTES.DASHBOARD,
      icon: <AiTwotoneHome fontSize="1.5rem" />,
    },
    {
      key: 2,
      title: 'Users',
      link: ROUTES.MUSERS,
      icon: <AiOutlineUser fontSize="1.5rem" />,
    },
    {
      key: 3,
      title: 'Posts',
      link: ROUTES.MPOST,
      icon: <AiFillSnippets fontSize="1.5rem" />,
    },
    {
      key: 4,
      title: 'Chat AI',
      link: ROUTES.MCHATAI,
      icon: <AiFillRobot fontSize="1.5rem" />,
    },
  ];
  const [activeItem, setActiveItem] = useState(1);
  const renderItems = () => {
    return listItem.map((item: any) => {
      return (
        <Link key={item.key} to={item.link}>
          <ListItem
            cursor="pointer"
            color={activeItem === item.key ? 'white' : 'whiteAlpha.700'}
            _hover={{ color: 'white' }}
            display="flex"
            alignItems="center"
            h="3rem"
            onClick={() => setActiveItem(item.key)}
          >
            <Box>{item?.icon}</Box>
            <Text ml="0.6rem" pt="0.2rem">
              {item.title}
            </Text>
          </ListItem>
        </Link>
      );
    });
  };

  return (
    <List pl="1.5rem" mt="1.5rem">
      {renderItems()}
    </List>
  );
};

export default NavBar;
