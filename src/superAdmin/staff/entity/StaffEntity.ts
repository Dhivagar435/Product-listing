
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable, ManyToMany, OneToOne, } from "typeorm";
import { Crud } from "../../../common/entity/Crud.entity";
import { StaffDetails } from "./StaffDetailsEntity";
import { User } from "../../../common/entity/User.entity";
@Entity("staff_tbl")
export class Staff {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  staffCode!: string;

  @Column({ type: "char", length: 60 , nullable: true})
  password!: string;

  @Column({ type: "varchar",unique: true  })
  idempotency!: string;

  @Column(() => User, { prefix: false })
  Users!: User;

  @OneToOne(() => StaffDetails, details => details.staff)
  details!: StaffDetails;

  @Column(() => Crud, { prefix: false })
  Cruds!: Crud;

}















