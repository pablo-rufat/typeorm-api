import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User, UserType} from "./user.entity";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { RESTResult } from "../interfaces";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        const users = await this.userRepository.find({ relations: ["resume"] });
        return {
            status: 200,
            content: users
        };
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        const user = await this.userRepository.findOne(request.params.id, { relations: ["resume"] });
        if (!user) {
            return {
                status: 404,
                content: {
                    message: "User not found."
                }
            };
        }
        return {
            status: 200,
            content: user
        };
    }

    async registerUser(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        try {
            const exists = await this.userRepository.findOne({ email: request.body.email });
            if (exists) {
                return {
                    status: 400,
                    content: {
                        message: "User already registered."
                    }
                };
            }

            const user = await this.userRepository.save({
                ...request.body,
                password: await this.hashPassword(request.body.password)
            });
            return {
                status: 201,
                content: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    type: user.type
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

    async remove(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        let userToRemove = await this.userRepository.findOne(request.params.id);

        if (!userToRemove){
            return {
                status: 404,
                content: {
                    message: "User not found."
                }
            };
        }

        await this.userRepository.remove(userToRemove);
        return {
            status: 200,
            content: {
                message: "deleted"
            }
        };
    }

    async logout(request: Request, response: Response): Promise<RESTResult> {
        return {
            status: 200,
            content: {
                accessToken: null
            }
        };
    }

    async login(request: Request, response: Response): Promise<RESTResult> {

        const user = await this.userRepository.findOne({ email: request.body.email }, { relations: ["resume"] });
        if (!user){
            return {
                status: 404,
                content: {
                    message: "User not found."
                }
            };
        }

        const validation = await user.validatePassword(request.body.password);
        if (!validation){
            return {
                status: 400,
                content: {
                    message: "Invalid Password."
                }
            }
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_API, {
            expiresIn: process.env.TOKEN_EXP_TIME,
        });

        return {
            status: 200,
            content: {
                accessToken: token,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    type: user.type
                }
            }
        };
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

}