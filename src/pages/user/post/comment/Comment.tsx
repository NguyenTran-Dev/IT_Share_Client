import {
  Box,
  IconButton,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
} from '@chakra-ui/react';
import React, { FC, useEffect, useId, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import CommentItem from './components/CommentItem';
import UserComment from './components/UserComment';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextareaCommon from '../../../../components/TextareaCommon';
import {
  ICommentsReducer,
  clearErrors,
  createCommentByPost,
  deleteCommentById,
} from '../../../../reducers/commentReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../stores/store';
import { IUser } from '../../../../interfaces';
import { useSelector } from 'react-redux';
import http from '../../../../services/api';
import { useAlert } from '../../../../providers/AlertProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import commentSchema, {
  ICommentForm,
} from '../../../../validators/commentSchema';
import { FormControl } from '../../../../components';
import LoadingThird from '../../../../components/loading/LoadingThird';

interface IComment {
  author: IUser;
  post_id: string;
}

const Comment: FC<IComment> = (props) => {
  const { author, post_id } = props;
  const $id = useId();
  const { showAlert } = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const { statusCode, message, loading } = useSelector<
    RootState,
    ICommentsReducer
  >((state) => state.commentReducer);
  const [listComments, setListComments] = useState([]);
  const [isLoadingCmt, setIsLoadingCmt] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICommentForm>({
    defaultValues: { comment: '' },
    reValidateMode: 'onChange',
    resolver: yupResolver(commentSchema),
  });

  const getCommentBase = async (id: string) => {
    setIsLoadingCmt(true);
    return await http
      .get(`/comments/comments-by-posts?postIds=${id}`)
      .then((response) => {
        return setListComments(response?.data);
      })
      .catch((error) => {
        return error;
      })
      .finally(() => {
        setIsLoadingCmt(false);
      });
  };

  useEffect(() => {
    if (statusCode)
      showAlert({
        title: message,
        status: statusCode,
      });
  }, [statusCode, message]);

  useEffect(() => {
    getCommentBase(post_id);
  }, []);

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const onSubmit: SubmitHandler<ICommentForm> = (data: ICommentForm) => {
    dispatch(clearErrors());
    const dataCmt = {
      comment: data.comment,
      user_id: author._id,
      post_id: post_id,
    };
    dispatch(createCommentByPost(dataCmt)).then(() => {
      getCommentBase(post_id);
      reset();
    });
  };

  const onDelete = (cmt_id: string) => {
    dispatch(clearErrors());
    dispatch(deleteCommentById(cmt_id)).then(() => {
      getCommentBase(post_id);
    });
  };

  const renderComments = () => {
    if (listComments.length > 0) {
      return listComments.map((comment: any) => {
        return (
          <ListItem mt="1rem" key={comment?._id}>
            <CommentItem
              item={comment}
              onDelete={() => onDelete(comment?._id)}
            />
          </ListItem>
        );
      });
    }
  };

  return (
    <Box>
      <Box as="form" id={$id} onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="" errorMessage={errors.comment?.message}>
          <UserComment author={author?.full_name ?? ''}>
            <InputGroup>
              <TextareaCommon
                placeholder="Write comment..."
                rows={1}
                name="comment"
                resize="none"
                control={control}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  form={$id}
                  type={loading ? 'button' : 'submit'}
                  colorScheme="blackAlpha.400"
                  aria-label="Search database"
                  icon={<AiOutlineSend color="gray" />}
                />
              </InputRightElement>
            </InputGroup>
          </UserComment>
        </FormControl>
      </Box>
      <List p=" 0 1rem 1rem">{renderComments()}</List>
      {isLoadingCmt && (
        <Box py="1rem">
          <LoadingThird />
        </Box>
      )}
    </Box>
  );
};

export default Comment;
