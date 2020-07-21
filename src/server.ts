import { getConnectionOptions, createConnection } from "typeorm";

export const connectDB = async () => {
    try {
        const options = await getConnectionOptions()
        const connection = await createConnection({
            ...options,
        });
        return connection;
    } catch(error) {
        console.log(error)
    }
};