import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Resume} from "./resume.entity";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from "../User";

export class ResumeController {

    private resumeRepository = getRepository(Resume);
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        // add filter and pagination
        // retornar só as infos com visible === true
        return this.resumeRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        // retornar só as infos com visible === true
        return this.userRepository.findOne(request.params.id);
    }

    async add(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findOne({ id: request.body.decodedId });
            if (!user) {
                throw new Error("user not found");
            }

            const resume = await this.resumeRepository.save({
                ...request.body.resume
            });

            user.resume = resume;
            await this.userRepository.save(user);

        // retornar só as infos com visible === true
            return resume;
        } catch(e) {
            return {
                message: e
            }
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        // comprovação token
        await this.resumeRepository.delete({ id: request.params.id });
        return{
            message: "deleted"
        };
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {

            // comprovação token

            const resume = await this.resumeRepository.findOne(request.params.id);

            resume.firstName = request.body.resume.firstName;
            resume.showId = request.body.resume.showId;
            resume.importantInfo = request.body.resume.importantInfo;

            await this.resumeRepository.save(resume);

        // retornar só as infos com visible === true
            return resume;
        } catch(e) {
            return {
                message: e
            }
        }
    }

}