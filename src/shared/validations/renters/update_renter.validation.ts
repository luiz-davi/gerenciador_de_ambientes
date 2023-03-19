import * as yup from 'yup';

export const update_renter_validation = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
  cpf: yup.string().min(11).max(11),
  current_password: yup.string().min(6).required('A senha atual é sempre obrigatória')
});