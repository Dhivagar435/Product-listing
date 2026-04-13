import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Crud } from "../../../common/entity/Crud.entity";
import { Category } from "../../category/entity/category.entity";
import { Brand } from "../../brand/entity/brand.entity";


@Entity("products_tbl")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("text")
    description!: string;

    @Column({ unique: true })
    sku!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    discountPrice!: number|null;

    @Column("float",{ nullable: true })
    discountPercentage!: number | null ;

    @Column({ default: true })
    isActive!: boolean;

    @Column("simple-array", { nullable: true })
    images!: string[];

    // @Column({ type: "float", default: 0 })
    // rating!: number;

    // @Column({ default: 0 })
    // reviewCount!: number;

    @ManyToOne(() => Category, (category) => category.products, { eager: true })
    category!: Category;

    @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
    brand!: Brand;

    @Column(() => Crud, { prefix: false })
    Cruds!: Crud;


}