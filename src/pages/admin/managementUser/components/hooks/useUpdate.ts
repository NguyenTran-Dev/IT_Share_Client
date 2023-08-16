import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserReducer, updateUserById } from '../../../../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../stores/store';
import { useSelector } from 'react-redux';
import { IUser } from '../../../../../interfaces';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import updateUserSchema from '../../../../../validators/updateUserSchema';

export const useUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userById, loading } = useSelector<RootState, IUserReducer>(
    (state) => state.userReducer
  );
  const { handleSubmit, control, reset, formState: { errors } } = useForm<IUser>({
    defaultValues: userById,
    reValidateMode: 'onChange',
    mode: 'onBlur',
    resolver: yupResolver(updateUserSchema)
  });

  useEffect(() => {
    reset(userById);
  }, [userById]);

  const onUpdate: SubmitHandler<IUser> = (data: IUser) => {
    dispatch(
      updateUserById(data)
    );
  };
  return { handleSubmit, control, errors, onUpdate, loading, userById, dispatch };
};
