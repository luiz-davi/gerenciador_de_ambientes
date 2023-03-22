import { Router } from "express";
import RentersController from "@controllers/renters.controller";
import {authMiddleware} from "@shared/middlewares/auth.middleware";

const routes = Router();

routes.post('/renters', authMiddleware, RentersController.create);
routes.get('/renters', authMiddleware, RentersController.index);
routes.get('/renters/:id', authMiddleware, RentersController.show);
routes.patch('/renters/:id', authMiddleware, RentersController.update);
routes.delete('/renters/:id', authMiddleware, RentersController.delete);

export default routes;