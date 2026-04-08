
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Crud } from "../../../common/entity/Crud.entity";
import { Staff } from "./StaffEntity";


@Entity("staff_details_tbl")
export class StaffDetails {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    qualification!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    houseNo!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    street!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    area!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    city!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    state!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    pinCode!: string | null;

    @OneToOne(() => Staff)
    @JoinColumn({ name: "staff_id" })
    staff!: Staff;

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;


}