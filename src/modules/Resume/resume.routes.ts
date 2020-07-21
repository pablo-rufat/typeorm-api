import { ResumeController } from "./resumeController";

export const ResumeRoutes = [{
    method: "get",
    route: "/resumes/:id",
    controller: ResumeController,
    action: "one"
}, {
    method: "get",
    route: "/resumes",
    controller: ResumeController,
    action: "all"
}, {
    method: "post",
    route: "/resumes",
    controller: ResumeController,
    action: "add"
}, {
    method: "delete",
    route: "/resumes/:id",
    controller: ResumeController,
    action: "remove"
}, {
    method: "put",
    route: "/resumes/:id",
    controller: ResumeController,
    action: "update"
}];