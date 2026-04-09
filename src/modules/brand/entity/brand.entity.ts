import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entity/product.entity";
import { Crud } from "../../../common/entity/Crud.entity";

@Entity("brand_tbl")
export class Brand {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Product, (product) => product.brand)
    products!: Product[];

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;

}