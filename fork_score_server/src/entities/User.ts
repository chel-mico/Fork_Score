import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    username: string

    // will be encrypted w/ bcrypt
    @Column()
    password: string

    // session token for myfitnesspal if we have time for integration
    @Column()
    mfptoken: string
}