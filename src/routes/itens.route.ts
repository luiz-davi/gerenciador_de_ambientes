import { Router }  from 'express';
//import { storage } from "@config/multer"
import auth from '@services/middlewares/auth.middleware';
import ItensController from '@controllers/itens.controller';

//const upload = storage;
const routes = Router();

routes.post("/environments/:id/itens", auth.call, ItensController.create);
//routes.get("/environments", auth.call, EnvironmentsController.index );
//routes.get("/environments/:id", auth.call, EnvironmentsController.show );
//routes.delete("/environments/:id", auth.call, EnvironmentsController.delete );

export default routes;