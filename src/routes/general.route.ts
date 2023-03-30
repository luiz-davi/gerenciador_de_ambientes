import GeneralController from '@controllers/general.controller';
import { Router }  from 'express';

const routes = Router();

routes.get('/', GeneralController.environsments);

export default routes;