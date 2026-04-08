import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
import { Crud } from "../../common/entity/Crud.entity";




@Entity("academic_year_tbl")
export class AcademicYear {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    academicYear!: string;

    @Column()
    startDate!: string;

    @Column()
    endDate!: string;

    @Column({ default: false, nullable: true })
    isActive!: boolean;

    @Column({ type: "varchar", unique: true })
    idempotency!: string;

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;
}
