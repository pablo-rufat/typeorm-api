import { getRepository } from "typeorm";
import { Resume, Offer, User } from "../modules";

export const clearDB = async () => {
    const userRepository = getRepository(User);
    const resumeRepository = getRepository(Resume);
    const offerRepository = getRepository(Offer);

    await userRepository.delete({});
    await resumeRepository.delete({});
    await offerRepository.delete({});
};