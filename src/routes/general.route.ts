import GeneralController from '@controllers/general.controller';
import { Router }  from 'express';

const routes = Router();

routes.get('/public/environments', GeneralController.environsments);
routes.get('/public/environments/:id', GeneralController.show_environment);
routes.get('/public/environments/:id/itens', GeneralController.itens);


export default routes;