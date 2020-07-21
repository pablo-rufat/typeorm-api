export { UserController } from "./User/userController";
export { User } from "./User/user.entity";
import { UserRoutes } from "./User/user.routes";
import { ResumeRoutes } from "./Resume";
export { ResumeController } from "./Resume/resumeController";
export { Resume } from "./Resume/resume.entity";

export const Routes = [
    ...UserRoutes,
    ...ResumeRoutes
];