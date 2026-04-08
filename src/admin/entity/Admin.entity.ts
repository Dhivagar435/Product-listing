
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable, ManyToMany, OneToOne, } from "typeorm";
import { User } from "../../common/entity/User.entity";
import { Crud } from "../../common/entity/Crud.entity";

@Entity("admin_tbl")
export class Admin {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "char", length: 60 })
  password!: string;

  @Column({ type: "varchar", unique: true })
  idempotency!: string;

  @Column(() => User, { prefix: false })
  Users!: User;

  @Column({ type: "varchar", length: 255, nullable: true })
  address1!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  address2!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  state!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  pinCode!: string | null;

  @Column(() => Crud, { prefix: false })
  Cruds!: Crud;

}
