import { getSession } from './servicesSession';

const isLogin = () => {
  const userInfo = getSession('user-info');
  if (Object.keys(userInfo).length > 0) {
    return true;
  }
  return false;
};

export default isLogin;
