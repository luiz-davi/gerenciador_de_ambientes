import * as yup from 'yup';

export const create_renter_validation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  cpf: yup.string().min(11).max(11).required()
});