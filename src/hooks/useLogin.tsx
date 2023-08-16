import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { IAUTH } from '../interfaces';
import isLogin from '../filters/isLogin';

export const useLogin = () => {
  const [isSigIn, setIsSigIn] = useState(false);
  const { info } = useSelector<RootState, IAUTH>((state) => state.authReducer);

  useEffect(() => {
    if (Object.keys(info).length > 0 || isLogin()) setIsSigIn(true);
  }, [info]);

  return { isSigIn };
};
