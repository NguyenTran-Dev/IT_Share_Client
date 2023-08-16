/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IPostReducer, clearErrors, getPostById } from '../../../../../reducers/postReducer';
import { AppDispatch, RootState } from '../../../../../stores/store';
import { useLoading } from '../../../../../providers/LoadingProvider';

export const useRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { loading, posts }= useSelector<RootState, IPostReducer>(
    (state) => state.postReducer
  );

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  useEffect(() => {
    if (loading) {
      return showLoading();
    }
    return hideLoading();
  }, [loading]);

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id as string));
    }
  }, [id]);

  return { posts };
};
