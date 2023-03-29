import * as yup from 'yup';

export default yup.object({
  name: yup.string().max(30).required(),
  amount: yup.number().required()
});

