import * as yup from 'yup';

export default yup.object({
  current_password: yup.string().min(6).required('A senha atual é sempre obrigatória')
});