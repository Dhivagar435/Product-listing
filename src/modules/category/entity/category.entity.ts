import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entity/product.entity";
import { Crud } from "../../../common/entity/Crud.entity";

@Entity("category_tbl")
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @OneToMany(() => Product, (product) => product.category)
    products!: Product[];

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;

}