import {Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

}
