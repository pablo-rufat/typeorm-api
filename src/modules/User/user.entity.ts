import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne} from "typeorm";
import * as bcrypt from "bcrypt";
import { Resume } from "../Resume/resume.entity";

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

    @OneToOne(type => Resume, resume => resume.user, { onDelete: 'CASCADE' },)
    resume: Resume;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

}
