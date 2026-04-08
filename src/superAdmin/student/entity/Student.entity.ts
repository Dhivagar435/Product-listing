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
} from "typeorm";
import { Crud } from "../../../common/entity/Crud.entity";
import { User } from "../../../common/entity/User.entity";



@Entity({ name: "student_tbl" })
export class Student {
  @PrimaryColumn({ type: "char", length: 10 })
  id!: string;

  @Column({ type: "char", length: 60, nullable: true })
  password!: string;

  @Column(() => User, { prefix: false })
  Users!: User;

  @Column({ type: "varchar", length: 255, nullable: true })
  rollNumber!: string;

  @Column({ type: "int", nullable: true })
  admission_pattern_id!: number;

  @Column({ type: "varchar", length: 50, unique: true, nullable: true })
  admissionNumber!: string;

  @Column({ type: "varchar", unique: true })
  idempotency!: string;

  @Column(() => Crud, { prefix: false })
  Cruds!: Crud;
}
