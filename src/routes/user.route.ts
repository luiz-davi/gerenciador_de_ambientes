import UsersController from "@controllers/UsersController"

export const user_routers = app => {
    app.post('/users', UsersController.create);
}