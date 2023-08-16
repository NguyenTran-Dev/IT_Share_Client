/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box,
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  List,
  ListItem,
  Tag,
} from '@chakra-ui/react';
import CardPost from '../post/cardPost/CardPost';
import { useRoot } from './hooks/useRoot';
import { IPost } from '../../../interfaces';
import { AiFillStar, AiOutlineWechat } from 'react-icons/ai';
import { SearchIcon } from '@chakra-ui/icons';

const HomePage = () => {
  const { listPost, deletePost, onChangeSearch, onSearch, searchVal } =
    useRoot();

  const renderPost = () => {
    return listPost?.map((item: IPost) => {
      return (
        <ListItem mt="2rem" key={item?._id}>
          <CardPost item={item} onDelete={() => deletePost(item?._id)} />
        </ListItem>
      );
    });
  };

  return (
    <Box className="home" pt="5.5rem">
      <Image
        src="https://img6.thuthuatphanmem.vn/uploads/2022/03/16/background-banner-cong-nghe_014239146.jpg"
        w="100%"
        maxHeight="20rem"
      />
      <Center>
        <InputGroup
          w="100%"
          maxWidth="65rem"
          top={{ base: '7rem', md: '10rem' }}
          position="absolute"
          p={{ base: '1rem', md: '2rem' }}
          borderRadius="0.5rem"
          backgroundColor="blackAlpha.200"
        >
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              onChangeSearch(e);
            }}
            value={searchVal}
          />
          <IconButton
            colorScheme="blue"
            w="100%"
            maxW={{ base: '1rem', md: '8rem' }}
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={onSearch}
          />
        </InputGroup>
      </Center>

      <Box className="home-slg" p="2" mt="0.7rem">
        <Heading
          color="white"
          fontSize="1.2rem"
          textAlign="center"
          fontStyle="italic"
        >
          ~~Join the Tech Base community to share knowledge together~~
        </Heading>
      </Box>
      <Container maxW="70rem">
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 12, md: 8 }}>
            {listPost.length >= 1 ? (
              <List mt="2rem" maxW="40rem" mx="auto">
                {renderPost()}
              </List>
            ) : (
              <Center>
                <Image src="https://store.vtctelecom.com.vn/Content/images/no-data.png" />
              </Center>
            )}
          </GridItem>
          <GridItem
            colSpan={{ base: 1, md: 4 }}
            display={{ base: 'none', md: 'block' }}
          >
            <Box>
              <Tag
                size="lg"
                colorScheme="blue"
                borderRadius="full"
                mt="1.9rem"
                position="relative"
                px="2rem"
              >
                <Box position="absolute" top="-0.6rem" right="-0.7rem">
                  <AiOutlineWechat size="2.2rem" />
                </Box>
                <Heading fontSize="1rem" color="linkedin.900">
                  Q&A new
                </Heading>
              </Tag>
              <Divider color="gray.700" my="0.5rem" />
              <List>
                <ListItem textAlign="center">
                  <Center>
                    <Image src="https://store.vtctelecom.com.vn/Content/images/no-data.png" />
                  </Center>
                </ListItem>
              </List>
            </Box>
            <Divider color="gray.700" my="0.5rem" />

            <Box mt="1rem" px="2rem">
              <Image
                w="100%"
                src="https://i.pinimg.com/736x/d1/52/d6/d152d60bb79f0e3014a2592f5c65080d.jpg"
              />
            </Box>

            <Box>
              <Tag
                size="lg"
                colorScheme="red"
                borderRadius="full"
                mt="1.9rem"
                position="relative"
                px="2rem"
              >
                <Box position="absolute" top="-0.6rem" right="-0.7rem">
                  <AiFillStar size="2.2rem" color="orange" />
                </Box>
                <Heading fontSize="1.2rem">Top 10 posts</Heading>
              </Tag>

              <List>
                <ListItem textAlign="center">
                  <Center>
                    <Image src="https://store.vtctelecom.com.vn/Content/images/no-data.png" />
                  </Center>
                </ListItem>
              </List>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
