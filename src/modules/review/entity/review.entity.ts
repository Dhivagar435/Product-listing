import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entity/product.entity";
import { Crud } from "../../../common/entity/Crud.entity";

@Entity("reviews")
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userName!: string;

    @Column("text")
    comment!: string;

    @Column({ type: "int" })
    rating!: number;

    @ManyToOne(() => Product, (product) => product.reviews)
    product!: Product;

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;
}