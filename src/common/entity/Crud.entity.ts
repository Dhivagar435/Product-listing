import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Crud {
  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  createdBy!: string;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  updatedBy!: string;

  @Column({ type: "timestamp", nullable: true })
  deletedAt!: Date;

  @Column({ default: 0, type: "tinyint" })
  isDeleted!: 0 | 1;

  @Column({ nullable: true })
  deletedBy!: string;
}
