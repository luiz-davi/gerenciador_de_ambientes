import { Router }  from 'express';
import auth from '@services/middlewares/auth.middleware';
import RentsController from '@controllers/rents.controller';

const routes = Router();

routes.post("/rents", auth.call, RentsController.create);

export default routes;