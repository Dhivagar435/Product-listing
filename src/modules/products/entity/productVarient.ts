import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("product_variants")
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    color!: string;

    @Column({ nullable: true })
    size!: string;

    @Column({ nullable: true })
    storage!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;

    @Column({ default: 0 })
    stock!: number;

    @ManyToOne(() => Product, (product) => product.variants)
    product!: Product;
}