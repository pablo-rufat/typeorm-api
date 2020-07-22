import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, OneToMany} from "typeorm";
import * as bcrypt from "bcrypt";
import { Resume } from "../Resume/resume.entity";
import { Offer } from "../Offer/offer.entity";

export enum UserType {
    company = "company",
    worker = "worker"
}

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    type!: UserType;

    @Column()
    password!: string;

    @OneToOne(type => Resume, resume => resume.user, { onDelete: 'CASCADE' },)
    resume: Resume;

    @OneToMany(type => Offer, offer => offer.offeredBy, { onDelete: 'CASCADE' },)
    offers: Offer[];

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

}
