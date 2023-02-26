import * as yup from 'yup';

export const login_validation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});