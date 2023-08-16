import MSG from '../constants/msgValidator';
import { REGEX_EMAIL } from '../constants/regex';
import { IUser } from '../interfaces';
import yup from './base';

const updateUserSchema: yup.ObjectSchema<IUser> = yup.object().shape({
  email: yup
    .string()
    .trim()
    .label('Email')
    .matches(REGEX_EMAIL, MSG.EmailFormat)
    .required(),
  full_name:  yup
    .string()
    .trim()
    .max(60)
    .min(2)
    .label('Full name')
    .required(),
  role:  yup
    .string()
    .trim()
    .label('Role')
    .required(),
  balance: yup
    .number()
    .required(),
  _id: yup
    .string()
    .required()
});

export default updateUserSchema;
