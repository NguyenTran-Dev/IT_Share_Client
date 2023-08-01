import { getSession } from './servicesSession';
const userInfo = getSession('userInfo');

const isLogin = () => {
  if (Object.keys(userInfo).length > 0) {
    return true;
  }
  return false;
};

export default isLogin;
