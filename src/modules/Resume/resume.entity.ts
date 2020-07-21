import {Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn} from "typeorm";
import { User } from "../User/user.entity";

export interface PersonalInfo {
    value: string;
    visible: boolean;
}

@Entity()
export class Resume {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    showId: string;

    @Column("jsonb")
    firstName: PersonalInfo;

    @Column()
    importantInfo: string;

    @OneToOne(type => User, user => user.resume, { cascade: true, onDelete: 'CASCADE' },)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
