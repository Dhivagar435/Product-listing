import { Column } from "typeorm";

export class User {
    @Column({ type: "varchar", length: 255 })
    firstName!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    lastName!: string | null;

    @Column({ type: "varchar", length: 255 })
    email!: string;

    @Column({ type: "varchar", length: 13 })
    phoneNumber!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    gender!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true, unique: true })
    userName!: string | null;

    @Column({ type: "date" })
    dob!: Date;

    @Column({ type: "varchar", length: 255 })
    photoName!: string;

}