import { Router } from "express";
import RentersController from "@controllers/renters.controller";
import auth from "@services/middlewares/auth.middleware";

const routes = Router();

routes.post('/renters', auth.call, RentersController.create);
routes.get('/renters', auth.call, RentersController.index);
routes.get('/renters/:id', auth.call, RentersController.show);
routes.patch('/renters/:id', auth.call, RentersController.update);
routes.delete('/renters/:id', auth.call, RentersController.delete);

export default routes;