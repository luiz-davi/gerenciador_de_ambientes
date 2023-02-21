import UsersController from "@controllers/users/users.controller"

export const user_routers = app => {
    app.post('/users', UsersController.create);
    app.get('/users/:id', UsersController.show);
    app.patch('/users/:id', UsersController.update);
}