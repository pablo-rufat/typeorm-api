import { OfferController } from "./offerController";

export const OfferRoutes = [{
    method: "get",
    route: "/offers/:id",
    controller: OfferController,
    action: "one",
    verifyToken: true,
}, {
    method: "get",
    route: "/offers",
    controller: OfferController,
    action: "all",
    verifyToken: true,
}, {
    method: "post",
    route: "/offers",
    controller: OfferController,
    action: "add",
    verifyToken: true,
}, {
    method: "delete",
    route: "/offers/:id",
    controller: OfferController,
    action: "remove",
    verifyToken: true,
}, {
    method: "put",
    route: "/offers/:id",
    controller: OfferController,
    action: "update",
    verifyToken: true,
}, {
    method: "put",
    route: "/offers/:id",
    controller: OfferController,
    action: "candidate",
    verifyToken: true,
}, {
    method: "put",
    route: "/offers/:id",
    controller: OfferController,
    action: "complain",
    verifyToken: true,
}];