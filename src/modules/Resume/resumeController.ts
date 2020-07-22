import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Resume} from "./resume.entity";
import { User } from "../User";
import { UserType } from "../User/user.entity";
import { RESTResult } from "../interfaces";

export class ResumeController {

    private resumeRepository = getRepository(Resume);
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        // add filter and pagination
        // retornar só as infos com visible === true
        const resumes = await this.resumeRepository.find();
        return {
            status: 200,
            content: resumes
        };
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        // retornar só as infos com visible === true
        const resume = await this.resumeRepository.findOne(request.params.id);
        return {
            status: 200,
            content: resume
        };
    }

    async add(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        try {
            const user = await this.userRepository.findOne({ id: request.body.decodedId });
            if (!user) {
                return {
                    status: 404,
                    content: {
                        message: "user not found"
                    }
                };
            }
            if (user.type === UserType.company) {
                return {
                    status: 400,
                    content: {
                        message: "Can't upload resume."
                    }
                };
            }

            const resume = await this.resumeRepository.save({
                ...request.body.resume
            });

            user.resume = resume;
            await this.userRepository.save(user);

        // retornar só as infos com visible === true
            return {
                status: 201,
                content: resume
            };
        } catch(e) {
            return {
                status: 500,
                content: {
                    message: e
                }
            }
        }
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        // comprovação token
        await this.resumeRepository.delete({ id: request.params.id });
        return{
            status: 200,
            content: {
                message: "deleted"
            }
        };
    }

    async update(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        try {

            const resume = await this.resumeRepository.findOne(request.params.id);

            resume.firstName = request.body.resume.firstName;
            resume.showId = request.body.resume.showId;
            resume.importantInfo = request.body.resume.importantInfo;

            await this.resumeRepository.save(resume);

        // retornar só as infos com visible === true
            return {
                status: 200,
                content: {
                    resume
                }
            };
        } catch(e) {
            return {
                status: 500,
                content: {
                    message: e
                }
            }
        }
    }

}