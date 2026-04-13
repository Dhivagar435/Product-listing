import { inject, injectable } from "tsyringe";
import { AppDataSource } from "../../../config/data-source";
import { AppError } from "../../../constant/error/App.error";

import { CommonRepository } from "../../../common/repo/common.repo";
import { ProductRepoInterface } from "../repository/product.repoInterface";
import { AddProductDto } from "../controller/addProductDto";
import { UpdateProductDto } from "../controller/updateProductDto";



@injectable()
export class ProductService {
    constructor(
        @inject("productRepository") private productRepository: ProductRepoInterface,

        @inject("CommonRepository")
        private commonRepository: CommonRepository,
    ) { }

    addProduct = async (productDTO: AddProductDto) => {
        try {

           
            const category = await this.commonRepository.findActiveRecord(
                "category_tbl",
                "id",
                { id: productDTO.getCategoryId(), isDeleted: 0 }
            );

            if (!category) {
                throw new AppError("Category not found", 404);
            }

          
            const brand = await this.commonRepository.findActiveRecord(
                "brand_tbl",
                "id",
                { id: productDTO.getBrandId(), isDeleted: 0 }
            );

            if (!brand) {
                throw new AppError("Brand not found", 404);
            }

           
            const existing = await this.commonRepository.findActiveRecord(
                "products_tbl",
                "sku",
                { sku: productDTO.getSku(), isDeleted: 0 }
            );

            if (existing) {
                throw new AppError("SKU already exists", 400);
            }

            const result = await this.productRepository.addProduct(
                productDTO,
                category,
                brand
            );

            return result;

        } catch (error) {
            console.log(error, "product service error");
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to add product", 500, error);
        }
    };

    getProducts = async (page: number, limit: number, q: string,categoryId?: number) => {
        try {

            const result = await this.productRepository.getProducts(page, limit, q,categoryId);

            if (!result.data || result.data.length === 0) {
                return {
                    status: "PRODUCT_NOT_FOUND",
                    data: []
                };
            }

            return {
                status: "SUCCESS",
                data: result.data,
                total: result.total
            };

        } catch (err) {
            console.log(err, "product search error");

            if (err instanceof AppError) throw err;
            throw new AppError("Failed to fetch products", 500, err);
        }
    };

    getProductById = async (id: number) => {
        try {

            const product = await this.productRepository.getProductById(id);

            if (!product) {
                throw new AppError("Product not found", 404);
            }

            return product;

        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to get product", 500);
        }
    };

    updateProduct = async (updateProductDto: UpdateProductDto) => {
    try {

        const existingProduct = await this.productRepository.getProductById(updateProductDto.getId());

        if (!existingProduct) {
            throw new AppError("Product not found", 404);
        }

        // optional: validate category
        let category = existingProduct.category;
        if (updateProductDto.getCategoryId()) {
            category = await this.commonRepository.findActiveRecord(
                "category_tbl",
                "id",
                { id: updateProductDto.getCategoryId(), isDeleted: 0 }
            );
        }

        // optional: validate brand
        let brand = existingProduct.brand;
        if (updateProductDto.getBrandId()) {
            brand = await this.commonRepository.findActiveRecord(
                "brand_tbl",
                "id",
                { id: updateProductDto.getBrandId(), isDeleted: 0 }
            );
        }

        const updated = await this.productRepository.updateProduct(
            existingProduct,
            updateProductDto,
            category,
            brand
        );

        return updated;

    } catch (err) {
        console.log(err, "update_product_service");
        if (err instanceof AppError) throw err;
        throw new AppError("Failed to update product", 500, err);
    }
};


    deleteProduct = async (id: number): Promise<any> => {
        try {

            const existingCategory = await this.commonRepository.findActiveRecord(
                "products_tbl",
                "id",
                { id, isDeleted: 0 }
            );

            if (!existingCategory) {
                return { status: "PRODUCT_NOT_FOUND" };
            }

            await this.productRepository.deleteProduct(id);

            return {
                status: "SUCCESS"
            };

        } catch (err) {
            console.log(err, "delete_product_service");

            if (err instanceof AppError) throw err;
            throw new AppError("Failed to delete Product", 500, err);
        }
    };

}



