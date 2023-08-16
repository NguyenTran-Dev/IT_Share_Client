import yup from './base';
export type ICommentForm = {
  comment: string;
};
const commentSchema: yup.ObjectSchema<ICommentForm> = yup.object().shape({
  comment: yup
    .string()
    .trim()
    .label('Comment')
    .required(),
});

export default commentSchema;
