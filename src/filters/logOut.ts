import { clearSession } from './servicesSession';
import { deleteCookie } from './servicesCookie';
import { ROUTES } from '../config/routes';
export const logOut = () => {
  clearSession();
  deleteCookie('access_token');
  deleteCookie('refresh_token');
  window.open(ROUTES.LOGIN, '_self');
};
