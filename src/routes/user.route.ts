import { Router } from "express";
import { storage } from "@config/multer"
import UsersController from "@controllers/users.controller"
import auth from "@services/middlewares/auth.middleware";

const upload = storage;
const routes = Router();

routes.post('/users', upload.single('file'),UsersController.create);
routes.get('/users/show', auth.call_user, UsersController.show);
routes.patch('/users', auth.call_user, upload.single('file'), UsersController.update);
routes.delete('/users', auth.call_user, UsersController.destroy);
routes.post('/users/login', UsersController.login);
routes.post('/users/send_email', auth.call_user, UsersController.send_email);
routes.post('/users/validate_email', auth.call_user, UsersController.check_token);

export default routes;