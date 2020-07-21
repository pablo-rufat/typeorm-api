export { UserController } from "./User/userController";
export { User } from "./User/user.entity";
import { UserRoutes } from "./User/user.routes";
import { ResumeRoutes } from "./Resume";
export { ResumeController } from "./Resume/resumeController";
export { Resume } from "./Resume/resume.entity";
import { OfferRoutes } from "./Offer";
export { OfferController } from "./Offer/offerController";
export { Offer } from "./Offer/offer.entity";

export const Routes = [
    ...UserRoutes,
    ...ResumeRoutes,
    ...OfferRoutes
];