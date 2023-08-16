import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSession } from '../../../../../filters/servicesSession';
import { IPost } from '../../../../../interfaces';
import { IPostReducer, getPosts } from '../../../../../reducers/postReducer';
import { AppDispatch, RootState } from '../../../../../stores/store';

export const useRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [listMyPost, setListMyPost] = useState<IPost[]>([]);
  const userInfo = getSession('user-info');
  const { posts } = useSelector<RootState, IPostReducer>(
    (state) => state.postReducer
  );

  useEffect(() => {
    dispatch(getPosts(''));
  }, []);

  useEffect(() => {
    const result = posts.filter(
      (item: IPost) => item?.user_id === userInfo?._id
    );
    setListMyPost([...result] ?? []);
  }, [posts]);

  return { listMyPost };
};
