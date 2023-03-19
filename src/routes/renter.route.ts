import { Router } from "express";
import RentersController from "@controllers/renter.controller";
import {authMiddleware} from "@shared/middlewares/auth.middleware";

const routes = Router();

routes.post('/renters', authMiddleware, RentersController.create);
routes.get('/renters', authMiddleware, RentersController.index);
routes.get('/renters/:id', authMiddleware, RentersController.show);

export default routes;