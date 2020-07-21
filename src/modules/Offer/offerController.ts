import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Offer} from "./offer.entity";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from "../User";
import { UserType } from "../User/user.entity";

export class OfferController {

    private offerRepository = getRepository(Offer);
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        // add filter and pagination
        return this.offerRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.offerRepository.findOne(request.params.id);
    }

    async add(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findOne({ id: request.body.decodedId });
            if (!user) {
                return {
                    message: "User not found."
                };
            }
            if (user.type === UserType.worker) {
                return {
                    message: "Can't upload job offer."
                };
            }

            const offer = await this.offerRepository.save({
                ...request.body.offer
            });

            user.offers.push(offer);
            await this.userRepository.save(user);

            return offer;
        } catch(e) {
            return {
                message: e
            }
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        // comprovação token
        await this.offerRepository.delete({ id: request.params.id });
        return{
            message: "deleted"
        };
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {

            const offer = await this.offerRepository.findOne(request.params.id);
            offer.description = request.body.offer.description;
            await this.offerRepository.save(offer);

            return offer;
        } catch(e) {
            return {
                message: e
            }
        }
    }

    async candidate(request: Request, response: Response, next: NextFunction) {
        try {

            const user = await this.userRepository.findOne({ id: request.body.decodedId });
            if(!user) {
                return {
                    message: "User not found."
                };
            }
            if(user.type === UserType.company) {
                return {
                    message: "Can't candidate to job offers."
                };
            }

            const offer = await this.offerRepository.findOne(request.params.id);
            if(!offer) {
                return {
                    message: "Offer not found."
                };
            }

            if (offer.offeredBy === user) {
                return {
                    message: "Can't candidate to this job offer."
                };
            }

            offer.candidates.push(user);
            await this.offerRepository.save(offer);

            return offer;
        } catch(e) {
            return {
                message: e
            }
        }
    }

    async complain(request: Request, response: Response, next: NextFunction) {
        try {

            const offer = await this.offerRepository.findOne(request.params.id);
            if(!offer) {
                return {
                    message: "Offer not found."
                };
            }

            offer.complains.push(request.body.complain);
            await this.offerRepository.save(offer);

            return offer;
        } catch(e) {
            return {
                message: e
            }
        }
    }

}