import { Router }  from 'express';
//import { storage } from "@config/multer"
import auth from '@services/middlewares/auth.middleware';
import ItensController from '@controllers/itens.controller';

//const upload = storage;
const routes = Router();

routes.post("/environments/:id/itens", auth.call, ItensController.create);
routes.get("/environments/:id/itens", auth.call, ItensController.listing);

export default routes;