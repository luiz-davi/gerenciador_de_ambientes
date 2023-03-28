import { Router }  from 'express';
import { storage } from "@config/multer"
import auth from '@services/middlewares/auth.middleware';
import EnvironmentsController from '@controllers/environments.controller';

const upload = storage;
const routes = Router();

routes.post("/environments", upload.array("files"), auth.call ,EnvironmentsController.create );
routes.get("/environments", auth.call, EnvironmentsController.index );

export default routes;