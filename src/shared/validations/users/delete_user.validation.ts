import * as yup from 'yup';

export default yup.object({
  password: yup.string().min(6).required(),
  confirm_password: yup.string().min(6).oneOf([yup.ref('password')]).required()
});