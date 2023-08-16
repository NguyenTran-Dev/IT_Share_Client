/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Image,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineCopy,
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineMore,
  AiOutlineShareAlt,
  AiTwotoneLike,
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { ModalCommon } from '../../../../components';
import { ROUTES } from '../../../../config/routes';
import { copyToClipboard } from '../../../../filters/copyToClipboard';
import isLogin from '../../../../filters/isLogin';
import { IPost } from '../../../../interfaces';
import AccountUser from '../../components/accountUser/AccountUser';
import Comment from '../comment/Comment';
import LoginModal from '../../../../components/LoginModal';
import { useRoot } from './hooks/useRoot';
import BgPostImg from '../../../../assets/images/bg-post.png';

const CardPost: React.FC<{
  item: IPost;
  onDelete?: () => void;
}> = (props) => {
  const { item, onDelete } = props;
  const {
    userInfo,
    onShare,
    isOpen,
    setIsOpen,
    urlText,
    emotion,
    onShowComment,
    isCmt,
    isShowLogin,
    setIsShowLogin,
    onEmotions,
    totalEmotions,
    isEmotion,
    emotionsResult,
  } = useRoot();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    emotion(item._id);
  }, [item._id]);

  const handleMouseEnter = () => {
    setIsPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    setIsPopoverOpen(false);
  };
  return (
    <Box>
      <Card maxW="100%">
        <CardHeader>
          <Flex>
            <AccountUser item={item} />
            {isLogin() && (
              <Menu isLazy>
                <MenuButton>
                  <AiOutlineMore />
                </MenuButton>
                <MenuList>
                  {userInfo?._id === item?.user_id || userInfo?.role === 1 ? (
                    <>
                      <MenuItem>
                        <Link to={`${ROUTES.UPDATE}/${item?._id}`}>Update</Link>
                      </MenuItem>
                      <MenuItem color="red" onClick={onDelete}>
                        Delete
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem>Report</MenuItem>
                  )}
                </MenuList>
              </Menu>
            )}
          </Flex>
        </CardHeader>
        <CardBody pt="0">
          <Text>{item?.title ?? ''}</Text>
        </CardBody>
        <Box
          cursor="pointer"
          onClick={() => navigator(`${ROUTES.POST}/${item?._id}`)}
        >
          <Image
            objectFit="cover"
            src={BgPostImg}
            width="100%"
            height="100%"
            maxH="10rem"
          />
        </Box>

        <Flex my="0.5rem" justify="space-between" px="2rem">
          <Popover isOpen={isPopoverOpen}>
            <PopoverTrigger>
              <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Flex alignItems="center" color="linkedin.500" cursor="pointer">
                  <AiTwotoneLike />
                  <Text
                    fontSize="0.8rem"
                    color="gray.500"
                    ml="0.2rem"
                    mt="0.1rem"
                  >
                    {totalEmotions}
                  </Text>
                </Flex>
              </Box>
            </PopoverTrigger>
            {totalEmotions > 0 && (
              <PopoverContent w="fix-content" bg="gray.300">
                <PopoverBody>
                  <List>
                    {emotionsResult?.emotions.map((item: any) => {
                      return (
                        <ListItem key={item?._id} fontSize="0.7rem">
                          {item?.full_name}
                        </ListItem>
                      );
                    })}
                  </List>
                </PopoverBody>
              </PopoverContent>
            )}
          </Popover>
        </Flex>
        <Divider color="gray.400" />
        <CardFooter
          p="0"
          justify="space-between"
          flexWrap="wrap"
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button
            flex="1"
            variant="ghost"
            leftIcon={
              <AiOutlineLike
                colorInterpolation={isEmotion ? 'linkedin.500' : ''}
              />
            }
            onClick={() => onEmotions(item?._id)}
            color={isEmotion ? 'linkedin.500' : ''}
          >
            Like
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<AiOutlineMessage />}
            onClick={() => onShowComment()}
          >
            Comment
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<AiOutlineShareAlt />}
            onClick={() => onShare(item?._id)}
          >
            Share
          </Button>
        </CardFooter>

        {isCmt && (
          <>
            <Divider color="gray.400" />
            <Comment author={userInfo} post_id={item?._id} />
          </>
        )}
      </Card>
      <ModalCommon
        isOpen={isOpen}
        setOpen={() => setIsOpen(false)}
        isBtnClose={false}
      >
        <Flex
          h="2rem"
          bg="gray.100"
          justifyContent="space-between"
          alignItems="center"
          pl="1rem"
        >
          <Text
            w="20rem"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            color="linkedin.500"
          >
            {urlText}
          </Text>
          <Button size="sm" onClick={() => copyToClipboard(urlText)}>
            <AiOutlineCopy />
          </Button>
        </Flex>
      </ModalCommon>
      <LoginModal isOpen={isShowLogin} setIsOpen={setIsShowLogin} />
    </Box>
  );
};

export default CardPost;
