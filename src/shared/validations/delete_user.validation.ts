import * as yup from 'yup';

export const delete_user_validation = yup.object({
  password: yup.string().min(6).required(),
  confirm_password: yup.string().min(6).oneOf([yup.ref('password')]).required()
});