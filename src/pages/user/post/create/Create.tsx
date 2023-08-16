/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Center, Container, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { FormControl } from '../../../../components';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../stores/store';
import {
  createPost,
  getPostById,
  IPostReducer,
  updatePost,
} from '../../../../reducers/postReducer';
import { getSession } from '../../../../filters/servicesSession';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../../config/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../../../../providers/AlertProvider';
import isLogin from '../../../../filters/isLogin';
import LoginModal from '../../../../components/LoginModal';

const Create = () => {
  const [value, setValue] = useState('# Hello world!!!');
  const [title, setTitle] = useState('');
  const currentUser = getSession('user-info');
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showAlert } = useAlert();
  const { statusCode, message, posts } = useSelector<RootState, IPostReducer>(
    (state) => state.postReducer
  );
  const { id } = useParams();

  const handleEditorChange = (value?: any) => {
    setValue(value);
  };

  useEffect(() => {
    setIsOpen(!isLogin());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id as string));
    }
  }, [id]);
  useEffect(() => {
    if (posts.length > 0 && id) {
      setTitle(posts?.[0]?.title);
      setValue(posts?.[0]?.description);
    }
  }, [posts, id]);

  useEffect(() => {
    if (statusCode)
      showAlert({
        title: message,
        status: statusCode,
      });
    if (statusCode === 200) {
      navigator(ROUTES.HOME);
    }
  }, [statusCode]);
  const onSubmit = () => {
    if (!isLogin()) {
      setIsOpen(true);
    } else {
      if (id) {
        dispatch(
          updatePost({
            _id: id,
            title: title,
            description: value,
            user_id: currentUser._id,
          })
        );
      } else {
        dispatch(
          createPost({
            title: title,
            description: value,
            user_id: currentUser._id,
          })
        );
      }
    }
  };

  return (
    <Container maxW="70rem" pt="6rem">
      <Box
        my="0.5rem"
        backgroundColor="white"
        p="1rem 2rem 2rem"
        borderRadius="0.7rem"
      >
        <FormControl label="Title" require>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is your sharing topic?"
          />
        </FormControl>
        <FormControl label="Content" require>
          <MDEditor
            height="64.9vh"
            value={value}
            onChange={handleEditorChange}
          />
        </FormControl>
        <Center>
          <Button
            width="350px"
            mt="1rem"
            colorScheme="linkedin"
            isDisabled={!value}
            onClick={onSubmit}
          >
            Upload
          </Button>
        </Center>
      </Box>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

export default Create;
