import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, } from "typeorm";
import { Crud } from "../../common/entity/Crud.entity";
import { AcademicYear } from "../../academicYear/entity/AcademicYear.entity";



@Entity("admission_pattern_tbl")
export class AdmissionPattern {
    @PrimaryGeneratedColumn()
    id!: number;


    @Column({ type: "varchar" })
    prefix!: string;

    @Column()
    middleName!: string;

    @Column()
    startSequence!: number;

    @Column({ default: false })
    isAllocated!: boolean;

    @ManyToOne(() => AcademicYear)
    @JoinColumn({ name: "academicYearId" })
    academicYear!: AcademicYear;

    @Column({ type: "varchar", unique: true })
    idempotency!: string;

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;
}
