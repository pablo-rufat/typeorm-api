import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User, UserType} from "./user.entity";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find({ relations: ["resume"] });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id, { relations: ["resume"] });
    }

    async registerUser(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.save({
                ...request.body,
                password: await this.hashPassword(request.body.password)
            });
            return user;
        } catch(e) {
            return {
                message: e
            }
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
        return {
            message: "deleted"
        };
    }

    async logout(request: Request, response: Response) {
        return {
            accessToken: null
        };
    }

    async login(request: Request, response: Response) {

        const user = await this.userRepository.findOne({ email: request.body.email }, { relations: ["resume"] });
        if (!user){
            return {
                message: "User not found."
            };
        }

        const validation = await user.validatePassword(request.body.password);
        if (!validation){
            return {
                message: "Invalid Password."
            }
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_API, {
            expiresIn: process.env.TOKEN_EXP_TIME,
        });

        return {
            accessToken: token,
            user
        };
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

}