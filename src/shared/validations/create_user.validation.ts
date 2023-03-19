import * as yup from 'yup';

export const create_user_validation = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  phone: yup.string().min(14).max(14).nullable()
});