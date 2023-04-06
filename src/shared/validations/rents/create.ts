import * as yup from 'yup';

export default yup.object({
  start: yup.date().required(),
  end: yup.date().required(),
  renter_id: yup.number().required(),
  environment_id: yup.number().required(),
});