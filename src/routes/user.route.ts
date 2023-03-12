import { Router } from "express";
import multer from 'multer';
import { storage } from "@config/multer"
import UsersController from "@controllers/users/users.controller"
import {authMiddleware} from "@shared/middlewares/auth.middleware";

const upload = storage;
const routes = Router();

routes.post('/users', upload.single('file'),UsersController.create);
routes.get('/users/show', authMiddleware, UsersController.show);
routes.patch('/users', authMiddleware, UsersController.update);
routes.delete('/users', authMiddleware,UsersController.destroy);
routes.post('/users/login', UsersController.login);

export default routes;