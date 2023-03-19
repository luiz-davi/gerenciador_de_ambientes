import * as yup from 'yup';

export const update_user_validation = yup.object({
  first_name: yup.string(),
  last_name: yup.string(),
  email: yup.string().email(),
  phone: yup.string().min(14).max(14),
  avatar_url: yup.string().url(),
  current_password: yup.string().min(6).required('A senha atual é sempre obrigatória'),
  password: yup.string().min(6),
  confirm_password: yup.string().min(6).when('password', ([password], field) =>{
    return password ? field.required().oneOf([yup.ref('password')], "Confirmação está incorreta.") : field
  })
});