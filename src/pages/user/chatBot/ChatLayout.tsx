import {
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  InputGroup,
  SimpleGrid,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
  AiOutlineDelete,
  AiOutlineMessage,
  AiOutlineSend,
  AiTwotoneThunderbolt,
} from 'react-icons/ai';
import { getSession } from '../../../filters/servicesSession';
import LoginModal from '../../../components/LoginModal';
import isLogin from '../../../filters/isLogin';
import { useChatBot } from './hooks/useChatBot';
import MgsItem from './components/MgsItem';
import LoadingThird from '../../../components/loading/LoadingThird';
import { SelectCommon } from '../../../components';
import iconBean from '../../../assets/svgs/beanEater.svg';

const ChatLayout = () => {
  const userInfo = getSession('user-info');
  const {
    prompts,
    setPrompt,
    prompt,
    setIsOpen,
    handleInputChange,
    outputText,
    isLoading,
    inputText,
    handleSubmit,
    setOutputText,
    isOpen,
    isSubmit,
    setIsSubmit,
    setLanguage,
    loading,
  } = useChatBot();

  useEffect(() => {
    setIsOpen(!isLogin());
  }, []);

  const renderPrompts = () => {
    return prompts?.map((item: any) => {
      return (
        <Card
          w="100%"
          key={item._id}
          onClick={() => {
            setPrompt(item);
          }}
          cursor="pointer"
          _hover={{ backgroundColor: 'linkedin.100' }}
        >
          <CardHeader>
            <Heading size={{ base: '0.7rem', md: '2rem' }}>
              {item.title}
            </Heading>
          </CardHeader>
        </Card>
      );
    });
  };

  const clearConversation = () => {
    setOutputText([]);
    setPrompt({
      _id: '',
      title: '',
      desc: '',
    });
    setIsSubmit(false);
  };

  return (
    <Container maxW="70rem" pt="7rem">
      <Flex justifyContent="center" alignItems="center" mb="1rem">
        <AiTwotoneThunderbolt color="green" />
        <Heading fontSize="1.2rem">GPT-4.0</Heading>
      </Flex>
      <Box>
        <Box minH={{ base: 'fit-content', md: '35rem' }}>
          {outputText.map((item: any) => {
            return (
              <MgsItem key={item.content} message={item} userInfo={userInfo} />
            );
          })}
          {isLoading && (
            <MgsItem
              message={{ role: 'Assistant', content: '...' }}
              userInfo={userInfo}
              isLoading={isLoading}
            />
          )}
          {!isSubmit && (
            <Box p="2rem" textAlign="center">
              <Center>
                <AiOutlineMessage />
              </Center>
              <Heading fontWeight="100" fontSize="1rem" my="1rem">
                AIPT - ChatGPT Prompts
              </Heading>

              {!loading ? (
                <SimpleGrid
                  spacing={4}
                  templateColumns={{
                    base: 'repeat(auto-fill, minmax(10rem, 1fr))',
                    md: 'repeat(auto-fill, minmax(20rem, 1fr))',
                  }}
                >
                  {renderPrompts()}
                </SimpleGrid>
              ) : (
                <Box mt="4rem">
                  <LoadingThird />
                </Box>
              )}
            </Box>
          )}
        </Box>
        {isLoading && (
          <Flex
            bg="white"
            maxW="8rem"
            alignItems="center"
            justifyContent="space-around"
            borderRadius="1rem"
            mx="auto"
          >
            <Text fontSize="0.8rem" color="gray.600" fontStyle="italic">
              AI thinking
            </Text>
            <Image src={iconBean} w="100%" maxW="2rem" />
          </Flex>
        )}
        <Card p="1rem" maxW="64rem" m="0 auto" mt="1rem">
          <Flex justifyContent="space-between">
            <Flex alignItems="center">
              <Heading fontSize="1rem" mr="0.5rem">
                Language:
              </Heading>
              <SelectCommon
                onSelect={(option) => {
                  setLanguage(option as string);
                }}
                options={[
                  { label: 'English', value: 'English' },
                  { label: 'Tiếng Việt', value: 'Tiếng Việt' },
                ]}
              />
            </Flex>
            {prompt?.title && (
              <Tag w="fit-content" bg="linkedin.100">
                <TagLabel>{prompt?.title ?? ''}</TagLabel>
                <TagCloseButton
                  onClick={() => {
                    setPrompt({
                      _id: '',
                      title: '',
                      desc: '',
                    });
                  }}
                />
              </Tag>
            )}
          </Flex>
          <InputGroup w="100%" mt="1rem">
            <Textarea
              placeholder="Writings...."
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={inputText}
              size="sm"
              resize="none"
            />
          </InputGroup>
          <Flex justifyContent="end" mt="0.5rem">
            {outputText?.length > 1 && (
              <Button
                colorScheme="red"
                w="100%"
                ml="1rem"
                maxW={{ base: '1rem', md: '8rem' }}
                aria-label="Search database"
                onClick={() => {
                  clearConversation();
                }}
              >
                <AiOutlineDelete />
              </Button>
            )}
            <Button
              colorScheme="blue"
              w="100%"
              maxW={{ base: '1rem', md: '8rem' }}
              aria-label="Search database"
              onClick={handleSubmit}
              ml="1rem"
              isDisabled={isLoading}
            >
              <AiOutlineSend />
            </Button>
          </Flex>
        </Card>
        <Text textAlign="center" color="gray" fontSize="0.7rem" mt="0.3rem">
          ChatGPT may produce accurate information about people, places, or
          facts.
        </Text>
      </Box>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

export default ChatLayout;
