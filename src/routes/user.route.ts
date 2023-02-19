import UsersController from "@controllers/UsersController"

export const user_routers = app => {
    app.get('/users', UsersController.index);
}