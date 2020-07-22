import {UserController} from "./userController";

export const UserRoutes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    verifyToken: false,
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    verifyToken: false,
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "registerUser",
    verifyToken: false,
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    verifyToken: true,
}, {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login",
    verifyToken: false,
}, {
    method: "post",
    route: "/logout",
    controller: UserController,
    action: "logout",
    verifyToken: true,
}];