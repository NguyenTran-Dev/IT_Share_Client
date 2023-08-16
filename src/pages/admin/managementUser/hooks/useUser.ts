import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../stores/store';
import { IUserReducer, deleteUserById, getListUser } from '../../../../reducers/userReducer';
import { useAlert } from '../../../../providers/AlertProvider';
import { useSearchParams } from 'react-router-dom';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert } = useAlert();
  const [searchParams] = useSearchParams();
  const keySearch = searchParams.get('search');

  const [isOpenModal, setIsOpenModal] = useState(false);

  const {users, statusCode, message} = useSelector<RootState, IUserReducer>(state => state.userReducer);

  useEffect(() => {
    dispatch(getListUser(keySearch ?? ''));
  }, []);

  useEffect(() => {
    if (statusCode)
      showAlert({
        title: message,
        status: statusCode,
      });
  }, [statusCode]);

  const handleDeletedUsers = (id: string) => {
    dispatch(deleteUserById(id)).finally(() => { 
      setIsOpenModal(false);
    });
  };


  const handleSearch = (searchVal: string) => {
    dispatch(getListUser(searchVal));
  };

  return {users, handleDeletedUsers, isOpenModal, setIsOpenModal, handleSearch};
};
