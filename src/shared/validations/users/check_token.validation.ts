import * as yup from 'yup';

export default yup.object({
  token: yup.string().required(),
});