import { ResumeController } from "./resumeController";

export const ResumeRoutes = [{
    method: "get",
    route: "/resumes/:id",
    controller: ResumeController,
    action: "one",
    verifyToken: false,
}, {
    method: "get",
    route: "/resumes",
    controller: ResumeController,
    action: "all",
    verifyToken: false,
}, {
    method: "post",
    route: "/resumes",
    controller: ResumeController,
    action: "add",
    verifyToken: true,
}, {
    method: "delete",
    route: "/resumes/:id",
    controller: ResumeController,
    action: "remove",
    verifyToken: true,
}, {
    method: "put",
    route: "/resumes/:id",
    controller: ResumeController,
    action: "update",
    verifyToken: true,
}];