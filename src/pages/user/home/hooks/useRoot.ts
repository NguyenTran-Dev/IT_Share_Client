import { useAlert } from './../../../../providers/AlertProvider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPost } from '../../../../interfaces';
import { useLoading } from '../../../../providers/LoadingProvider';
import { clearErrors, deletePostById, getPosts, IPostReducer } from '../../../../reducers/postReducer';
import { AppDispatch, RootState } from '../../../../stores/store';
import { useSearchParams } from 'react-router-dom';

export const useRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [listPost, setListPost] = useState<IPost[]>([]);
  const { showLoading, hideLoading } = useLoading();
  const { showAlert } = useAlert();
  const {posts, loading, statusCode, message} = useSelector<RootState, IPostReducer>(
    (state) => state.postReducer
  );
  const [searchParams] = useSearchParams();
  const keySearch = searchParams.get('search');

  const [searchVal, setSearchVal] = useState<string>(keySearch ?? '');
  
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(getPosts(keySearch ?? ''));
  }, []);

  useEffect(() => {
    if (loading) {
      return showLoading();
    }
    hideLoading();
  }, [loading]);

  useEffect(() => {
    if (statusCode)
      showAlert({
        title: message,
        status: statusCode,
      });
  }, [statusCode]);

  useEffect(() => {
    if (posts?.length > 0) {
      setListPost([...posts]);
    } else { 
      setListPost([]);
    }
  }, [posts]);

  const deletePost = (id: string) => {
    dispatch(deletePostById(id));
  };
  

  const onChangeSearch = (e: any) => {
    setSearchVal(e.target.value);
    window.history.pushState({ urlPath: '/' }, '', `/home?search=${e.target.value}`);
  };

  const onSearch = () => {
    dispatch(getPosts(searchVal));
  };

  return { listPost, deletePost, onChangeSearch, onSearch, searchVal };
};
