import GeneralController from '@controllers/general.controller';
import { Router }  from 'express';

const routes = Router();

routes.get('/public/environments', GeneralController.environsments);

export default routes;