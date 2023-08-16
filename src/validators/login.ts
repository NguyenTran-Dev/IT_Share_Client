import MSG from '../constants/msgValidator';
import { REGEX_EMAIL } from '../constants/regex';
import yup from './base';
export type ILogin = {
  email: string;
  password: string;
};
const loginSchema: yup.ObjectSchema<ILogin> = yup.object().shape({
  email: yup
    .string()
    .trim()
    .label('Email')
    .matches(REGEX_EMAIL, MSG.EmailFormat)
    .required(),
  password: yup
    .string()
    .trim()
    .label('Password')
    .required(),
});

export default loginSchema;
