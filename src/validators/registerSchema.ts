import MSG from '../constants/msgValidator';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../constants/regex';
import yup from './base';
export type IRegister = {
  email: string;
  full_name: string;
  password: string;
  cf_password?: string;
};
const registerSchema: yup.ObjectSchema<IRegister> = yup.object().shape({
  email: yup
    .string()
    .trim()
    .label('Email')
    .matches(REGEX_EMAIL, MSG.EmailFormat)
    .required(),
  full_name: yup
    .string()
    .trim()
    .max(60)
    .min(2)
    .label('Full name')
    .required(),
  password: yup
    .string()
    .trim()
    .max(16)
    .min(8)
    .label('Password')
    .matches(REGEX_PASSWORD, 'Password must have at least one uppercase, lowercase character and a number')
    .required(),
  cf_password: yup
    .string()
    .trim()
    .label('Confirm Password')
    .required(),
});

export default registerSchema;
