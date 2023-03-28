import * as yup from 'yup';

export default yup.object({
  search: yup.string().nullable(),
  page: yup.number().nullable(),
  page_size: yup.number().nullable(),
  ordering: yup.array().nullable(),
  pool: yup.bool().nullable(),
  grill: yup.boolean().nullable(),
  playground: yup.boolean().nullable(),
  kitchen: yup.boolean().nullable()
});