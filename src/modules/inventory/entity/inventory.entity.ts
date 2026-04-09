import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entity/product.entity";
import { Crud } from "../../../common/entity/Crud.entity";

@Entity("inventory_tbl")
export class Inventory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: 0 })
    stock!: number;

    @Column({ default: 0 })
    reservedStock!: number;

    @OneToOne(() => Product, (product) => product.inventory)
    @JoinColumn()
    product!: Product;

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;

}