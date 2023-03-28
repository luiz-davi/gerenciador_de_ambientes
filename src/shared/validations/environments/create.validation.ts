import * as yup from 'yup';

const items_validate = yup.object({
    name: yup.string().required(),
    amount: yup.number().required()
})

export default yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
  pool: yup.boolean().nullable(),
  grill: yup.boolean().nullable(),
  playground: yup.boolean().nullable(),
  kitchen: yup.boolean().nullable(),
  itens: yup.array().of(items_validate)
});