import * as yup from 'yup';

const items_validate = yup.object({
    name: yup.string().required(),
    amount: yup.number().required()
})

export default yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
  itens: yup.array().min(1).of(items_validate).required()
});