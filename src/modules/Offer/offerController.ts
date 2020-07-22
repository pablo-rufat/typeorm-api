import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Offer} from "./offer.entity";
import { User } from "../User";
import { UserType } from "../User/user.entity";
import { RESTResult } from "../interfaces";

export class OfferController {

    private offerRepository = getRepository(Offer);
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        // add filter and pagination
        const offers = await this.offerRepository.find();
        return {
            status: 200,
            content: offers
        };
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        const offer = await this.offerRepository.findOne(request.params.id);
        return {
            status: 200,
            content: offer
        };
    }

    async add(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        try {
            const user = await this.userRepository.findOne({ id: request.body.decodedId });
            if (!user) {
                return {
                    status: 404,
                    content: {
                        message: "User not found."
                    }
                };
            }
            if (user.type === UserType.worker) {
                return {
                    status: 400,
                    content: {
                        message: "Can't upload job offer."
                    }
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
                status: 500,
                content: {
                    message: e
                }
            }
        }
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        // comprovação token
        await this.offerRepository.delete({ id: request.params.id });
        return{
            status: 200,
            content: {
                message: "deleted"
            }
        };
    }

    async update(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        try {

            const offer = await this.offerRepository.findOne(request.params.id);
            offer.description = request.body.offer.description;
            await this.offerRepository.save(offer);

            return {
                status: 200,
                content: offer
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

    async candidate(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        try {

            const user = await this.userRepository.findOne({ id: request.body.decodedId });
            if(!user) {
                return {
                    status:404,
                    content: {
                        message: "User not found."
                    }
                };
            }
            if(user.type === UserType.company) {
                return {
                    status: 400,
                    content: {
                        message: "Can't candidate to job offers."
                    }
                };
            }

            const offer = await this.offerRepository.findOne(request.params.id);
            if(!offer) {
                return {
                    status: 404,
                    content: {
                        message: "Offer not found."
                    }
                };
            }

            if (offer.offeredBy === user) {
                return {
                    status: 400,
                    content: {
                        message: "Can't candidate to this job offer."
                    }
                };
            }

            offer.candidates.push(user);
            await this.offerRepository.save(offer);

            return {
                status: 200,
                content: offer
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

    async complain(request: Request, response: Response, next: NextFunction): Promise<RESTResult> {
        try {

            const offer = await this.offerRepository.findOne(request.params.id);
            if(!offer) {
                return {
                    status: 404,
                    content: {
                        message: "Offer not found."
                    }
                };
            }

            offer.complains.push(request.body.complain);
            await this.offerRepository.save(offer);

            return {
                status: 200,
                content: offer
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