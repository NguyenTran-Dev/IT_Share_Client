/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { clearErrorsAuth, signUp } from '../../../../reducers/authReducer';
import { AppDispatch, RootState } from '../../../../stores/store';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema, { IRegister } from '../../../../validators/registerSchema';
import { IAUTH } from '../../../../interfaces';
import { useSelector } from 'react-redux';
import { useAlert } from '../../../../providers/AlertProvider';
import isLogin from '../../../../filters/isLogin';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../config/routes';

export const useRoot = () => {
  const { handleSubmit, control, watch, formState: { errors } } = useForm<IRegister>({
    defaultValues: { email: '', password: '', full_name: '', cf_password: '' },
    reValidateMode: 'onChange',
    mode: 'onBlur',
    resolver: yupResolver(registerSchema)
  });

  const $navigator = useNavigate();
  const { showAlert } = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector<RootState, IAUTH>(state => state.authReducer);
  const [msgPass, setMsgPass] = useState<string>('');
  useEffect(() => {
    dispatch(clearErrorsAuth());
  }, []);

  useEffect(() => {
    if (watch('password') !== watch('cf_password') && !!watch('cf_password')) {
      setMsgPass('Confirm password fail');
    } else {
      setMsgPass('');
    }
  }, [watch('password'), watch('cf_password')]);


  useEffect(() => {
    if (authData.statusCode) {
      showAlert({
        title: authData.message,
        status: authData.statusCode,
      });
      if (authData.statusCode < 300) {
        $navigator(ROUTES.LOGIN);
      }
    }
  }, [authData.statusCode]);

  useEffect(() => {
    if (isLogin()) {
      $navigator(ROUTES.HOME);
    }
  }, [authData]);


  const onSubmit: SubmitHandler<IRegister> = (data: IRegister) => {
    if (!msgPass) {
      dispatch(signUp({ ...data, role: 3 , balance: 0}));
    }
  };
  

  return {
    handleSubmit,
    onSubmit,
    control,
    errors,
    msgPass
  };
};
