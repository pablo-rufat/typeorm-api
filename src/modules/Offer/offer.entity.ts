import {Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import { User } from "../User/user.entity";

@Entity()
export class Offer {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    empresa: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.resume, { cascade: true, onDelete: 'CASCADE' },)
    @JoinColumn()
    offeredBy: User;

    @OneToOne(type => User, user => user.resume)
    @JoinColumn()
    candidates: User[];

    @Column("text", {array: true})
    complains: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
