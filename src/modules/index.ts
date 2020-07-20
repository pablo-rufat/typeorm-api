export { UserController } from "./User/userController";
export { User } from "./User/user.entity";
import { UserRoutes } from "./User/user.routes";

export const Routes = [
    ...UserRoutes
];