
import { injectable } from "tsyringe";
import { AppDataSource } from "../../../config/data-source";
import { Product } from "../entity/product.entity";
import { AddProductDto } from "../controller/addProductDto";
import { Brand } from "../../brand/entity/brand.entity";
import { Category } from "../../category/entity/category.entity";
import { UpdateProductDto } from "../controller/updateProductDto";

@injectable()
export class ProductRepository {

    private repo = AppDataSource.getRepository(Product);

    addProduct = async (dto: AddProductDto, category: Category, brand: Brand) => {
        const product = this.repo.create({
            name: dto.getName(),
            description: dto.getDescription(),
            sku: dto.getSku(),
            price: dto.getPrice(),
            discountPrice: dto.getDiscountPrice(),
            discountPercentage: dto.getDiscountPercentage(),
            isActive: dto.getIsActive(),
            images: dto.getImages(),

            category: category,
            brand: brand,

            Cruds: {
                createdBy: dto.getCreatedBy()
            }
        });

        return await this.repo.save(product);
    };

    getProducts = async (page: number, limit: number, q: string, categoryId: number) => {

        const query = this.repo.createQueryBuilder("product")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.brand", "brand")
            .where("product.Cruds.isDeleted = :isDeleted", { isDeleted: 0 });

        //search condition
        if (q) {
            query.andWhere(
                `(LOWER(product.name) LIKE LOWER(:q) OR LOWER(product.description) LIKE LOWER(:q))`,
                { q: `%${q}%` }
            );
        }

        if (categoryId) {
            query.andWhere("category.id = :categoryId", { categoryId });
        }

        const [data, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("product.id", "DESC")
            .getManyAndCount();

        return { data, total };
    };


    getProductById = async (id: number) => {
        return await this.repo.findOne({
            where: {
                id,
                Cruds: { isDeleted: 0 }
            },
            relations: ["category", "brand"]
        });
    };

    updateProduct = async (
        product: Product,
        dto: UpdateProductDto,
        category: Category,
        brand: Brand
    ) => {
        if (dto.getName() !== undefined) product.name = dto.getName();
        if (dto.getDescription() !== undefined) product.description = dto.getDescription();
        if (dto.getPrice() !== undefined) product.price = dto.getPrice();
        if (dto.getDiscountPrice() !== undefined) product.discountPrice = dto.getDiscountPrice() ?? null;
        if (dto.getDiscountPercentage() !== undefined) product.discountPercentage = dto.getDiscountPercentage() ?? null;
        if (dto.getIsActive() !== undefined) product.isActive = dto.getIsActive();


        if (dto.getImages() !== undefined && dto.getImages().length > 0) {
            product.images = dto.getImages();
        }


        product.category = category;
        product.brand = brand;
        product.Cruds.updatedBy = dto.getUpdatedBy();

        return await this.repo.save(product);
    };

    deleteProduct = async (id: number) => {
        const product = await this.repo.findOne({
            where: { id }
        });

        if (!product) return null;
        product.Cruds.isDeleted = 1;
        product.Cruds.deletedAt = new Date();

        product.isActive = false;

        return await this.repo.save(product);
    };
}





