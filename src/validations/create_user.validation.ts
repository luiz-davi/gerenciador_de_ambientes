import * as yup from 'yup';

export const create_user_validation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  phone: yup.string().nullable()
});