import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
} from "typeorm";

import { Crud } from "../../../common/entity/Crud.entity";
import { Student } from "./Student.entity";


@Entity({ name: "student_detail_tbl" })
export class StudentDetail {
    @PrimaryColumn({ type: "char", length: 10 })
    id!: string;

    @Column({ type: "varchar", length: 13, nullable: true })
    whatsappNumber!: string;

    @Column({ type: "varchar", length: 8, nullable: true })
    typeofParental!: string;


    @Column({ type: "varchar", length: 255, nullable: true })
    houseNo!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    street!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    area!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    city!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    state!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    pinCode!: string;


    @Column({ type: "varchar", length: 255, nullable: true })
    motherName!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    motherOccupation!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    fatherName!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    fatherOccupation!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    guardianName!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    guardianOccupation!: string;

    @OneToOne(() => Student)
    @JoinColumn({ name: "studnet_id" })
    student!: Student;

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;
}
