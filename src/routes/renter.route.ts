import { Router } from "express";
import RentersController from "@controllers/renter.controller";
import {authMiddleware} from "@shared/middlewares/auth.middleware";

const routes = Router();

routes.post('/renters', authMiddleware, RentersController.create);

export default routes;