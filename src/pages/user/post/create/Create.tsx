/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Center, Container, Input } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { FormControl, SelectCommon } from '../../../../components';
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
import { useParams } from 'react-router-dom';
import { useAlert } from '../../../../providers/AlertProvider';
import isLogin from '../../../../filters/isLogin';
import LoginModal from '../../../../components/LoginModal';
import { categoriesOptions } from '../../../../constants/options';
import MSG from '../../../../constants/msgValidator';

const Create = () => {
  const [value, setValue] = useState('# Hello world!!!');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const currentUser = getSession('user-info');
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showAlert } = useAlert();
  const { statusCode, message, posts } = useSelector<RootState, IPostReducer>(
    (state) => state.postReducer
  );
  const { id } = useParams();

  const resetForm = useCallback(() => {
    setTitle('');
    setCategory('');
    setValue('');
  }, []);

  const handleEditorChange = (value?: any) => {
    setValue(value);
  };

  const checkValidation = useCallback(() => {
    if (!title) {
      showAlert({
        title: MSG.PostTitleRequire,
        status: 400,
      });
      return false;
    } else if (!value) {
      showAlert({
        title: MSG.PostContentRequire,
        status: 400,
      });
      return false;
    } else {
      return true;
    }
  }, [title, value]);

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
      resetForm();
    }
  }, [statusCode]);
  const onSubmit = () => {
    if (!isLogin()) {
      setIsOpen(true);
    } else {
      if (!checkValidation()) return;
      if (id) {
        dispatch(
          updatePost({
            _id: id,
            title: title,
            category: category,
            description: value,
            user_id: currentUser._id,
          })
        );
      } else {
        dispatch(
          createPost({
            title: title,
            category: category,
            description: value,
            user_id: currentUser._id,
          })
        );
      }
    }
  };

  return (
    <Container maxW="70rem">
      <Box
        mb="0.5rem"
        backgroundColor="white"
        p="0rem 2rem 2rem"
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
        <FormControl label="Categories" require>
          <SelectCommon
            onSelect={(value) => setCategory(value as string)}
            options={categoriesOptions}
            placeholder="Please select a category"
          ></SelectCommon>
        </FormControl>
        <FormControl label="Content" require>
          <MDEditor height="50vh" value={value} onChange={handleEditorChange} />
        </FormControl>
        <Center>
          <Button
            width="350px"
            mt="1rem"
            colorScheme="linkedin"
            isDisabled={!value || !title}
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
