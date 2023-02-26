import UsersController from "@controllers/users/users.controller"
import {authMiddleware} from "@shared/middlewares/auth.middleware";

export const user_routers = app => {
    app.post('/users', UsersController.create);
    app.get('/users/show', authMiddleware, UsersController.show);
    app.patch('/users', authMiddleware, UsersController.update);
    app.delete('/users/:id', UsersController.destroy);
    app.post('/users/login', UsersController.login);
}