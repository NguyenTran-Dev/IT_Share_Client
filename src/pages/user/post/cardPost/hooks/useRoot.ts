import { useLocation } from 'react-router-dom';
import { getSession } from '../../../../../filters/servicesSession';
import { ROUTES } from '../../../../../config/routes';
import { useEffect, useMemo, useState } from 'react';
import http from '../../../../../services/api';
import isLogin from '../../../../../filters/isLogin';
import { useBoolean } from '@chakra-ui/react';
import useDebounce from '../../../../../hooks/useDebounce';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../stores/store';
import { isEmotions } from '../../../../../reducers/emotionsReducer';

export const useRoot = () => {
  const userInfo = getSession('user-info');
  const location = useLocation();
  const { origin } = new URL(location.pathname, window.location.origin);

  const [urlText, setUrlText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [emotionsResult, setEmotionsResult] = useState<any>([]);
  const [countEmotion, setCountEmotion] = useState<number>(0);
  const [isCmt, setIsCmt] = useBoolean(false);
  const [isShowLogin, setIsShowLogin] = useState<boolean>(false);
  const [isEmotion, setIsEmotion] = useState<boolean>(false);

  const [debounce] = useDebounce();
  const dispatch = useDispatch<AppDispatch>();

  //Method
  const onShare = (id: string) => {
    setUrlText(`${origin}${ROUTES.POST}/${id}`);
    setIsOpen(true);
  };

  const emotion = async (id: string) => {
    return await http
      .get(`/emotion/${id}`)
      .then((response) => {
        setCountEmotion(0);
        return setEmotionsResult(response?.data);
      })
      .catch((error) => {
        return error;
      });
  };


  const onShowComment = () => {
    if (isLogin()) {
      setIsCmt.toggle();
    } else {
      setIsShowLogin(true);
    }
  };

  const onEmotions = (id: string) => {
    if (userInfo?._id) {
      debounce(() => {
        if (isEmotion) {
          setIsEmotion(false);
          setCountEmotion(countEmotion - 1);
        } else {
          setIsEmotion(true);
          setCountEmotion(countEmotion + 1);
        }

        dispatch(
          isEmotions({
            postId: id,
            emotionType: isEmotion ? 0 : 1,
            userId: userInfo?._id,
          })
        ).then(() => {
          emotion(id);
        });
      }, 1000);
    } else {
      setIsShowLogin(true);
    }
  };

  // check current like post
  useEffect(() => {
    const exitingUser =
      emotionsResult?.emotions?.filter(
        (emotion: any) => emotion.user_id === userInfo?._id
      ).length > 0;
    if (exitingUser) {
      setCountEmotion(0);
      setIsEmotion(true);
    } else {
      setIsEmotion(false);
    }
  }, [emotionsResult]);

  const totalEmotions = useMemo(() => {
    const result = Number(emotionsResult?.total ?? 0) + countEmotion;
    return result >= 0 ? result : 0;
  }, [emotionsResult, countEmotion]);

  return {
    userInfo,
    onShare,
    isOpen,
    setIsOpen,
    urlText,
    emotion,
    emotionsResult,
    setCountEmotion,
    countEmotion,
    onShowComment,
    isCmt,
    isShowLogin,
    setIsShowLogin,
    onEmotions,
    totalEmotions,
    isEmotion,
  };
};
