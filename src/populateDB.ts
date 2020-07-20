import { getRepository } from "typeorm";
import { User } from "./modules/User";


export const populate = () => {
    const repo = getRepository(User);

    repo.delete({});

    repo.save({
        firstName: "Pablo",
        lastName: "Rufat",
        age: 28,
        email: "pablo@gmail.com",
        password: "123456",
    });
};