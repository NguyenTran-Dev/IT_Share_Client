/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector , useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../config/routes';
import isLogin from '../../../../filters/isLogin';
import { clearErrorsAuth, signIn } from '../../../../reducers/authReducer';
import { AppDispatch, RootState } from '../../../../stores/store';
import loginSchema, { ILogin } from '../../../../validators/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from '../../../../providers/AlertProvider';
import { IAUTH } from '../../../../interfaces';
import { RoleUser } from '../../../../constants/enum';

export const useRoot = () => {
  const $navigator = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm<ILogin>({
    defaultValues: { email: '', password: '' },
    reValidateMode: 'onChange',
    mode: 'onBlur',
    resolver: yupResolver(loginSchema)
  });
  const { showAlert } = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const { statusCode, message, loadingBtn, info } = useSelector<RootState, IAUTH>(state => state.authReducer);
  
  useEffect(() => {
    dispatch(clearErrorsAuth());
  }, []);

  useEffect(() => {
    if (statusCode)
      showAlert({
        title: message,
        status: statusCode,
      });
  }, [statusCode]);

  useEffect(() => {
    if (isLogin()) {
      if (info?.role === RoleUser.ADMIN) {
        return $navigator(ROUTES.ADMIN);
      }
      return $navigator(ROUTES.HOME);
    }
  }, [message, info]);

  const onSubmit:SubmitHandler<ILogin> = (data: ILogin) => {
    dispatch(signIn(data));
  };
  

  return {
    handleSubmit,
    onSubmit,
    control,
    errors,
    loadingBtn
  };
};
