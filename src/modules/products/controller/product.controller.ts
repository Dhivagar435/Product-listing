import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { ERORR_MESSAGES } from "../../../constant/message/Error.message";
import { DataSanitize } from "../../../utils/DataSanitize";
import { ProductServiceInterface } from "../service/product.serviceInterface";
import { AddProductDto } from "./addProductDto";
import { UpdateProductDto } from "./updateProductDto";




@injectable()
export class ProductController {
    constructor(@inject("productService") private productService: ProductServiceInterface) { }

    addProduct = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body, "addproductbodyyy")
        try {
            let {
                name,
                description,
                sku,
                price,
                discountPrice,
                discountPercentage,
                isActive,
                images,
                categoryId,
                brandId,
                createdBy } = req.body

            const missingFields = [
                "name",
                "description",
                "sku",
                "price",
                "isActive",
                "images",
                "categoryId",
                "brandId",
                "createdBy"].filter(field => req.body[field] === undefined || req.body[field] === null)
            if (missingFields.length > 0) {
                return ApiResponse.error(
                    res,
                    `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                    400
                );
            }
            ({
                name,
                description,
                sku,
                price,
                discountPrice,
                discountPercentage,
                isActive,
                images,
                categoryId,
                brandId,
                createdBy
            } = DataSanitize.sanitize({ name, description, sku, price, discountPrice, discountPercentage, isActive, images, categoryId, brandId, createdBy }));

            const productDTO = new AddProductDto(name, description, sku, price, isActive, images, categoryId, brandId, createdBy, discountPrice, discountPercentage,)
            const result = await this.productService.addProduct(productDTO);
            return ApiResponse.success(res, "PRODUCT CREATED", result);
        }
        catch (error) {
            console.log(error, "controllererror")
            next(error)
        }
    }


    getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const q = (req.query.q as string) || "";

            const result = await this.productService.getProducts(page, limit, q);

            return ApiResponse.success(res, "PRODUCTS FETCHED", result);

        } catch (error) {
            next(error);
        }
    };

    getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            if (!id) {
                return ApiResponse.error(res, "ID is required", 400);
            }

            const result = await this.productService.getProductById(Number(id));

            return ApiResponse.success(res, "PRODUCT FETCHED", result);

        } catch (error) {
            next(error);
        }
    };

    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            let {
                name,
                description,
                price,
                discountPrice,
                discountPercentage,
                isActive,
                images,
                categoryId,
                brandId,
                updatedBy
            } = req.body;

            if (!id) {
                return ApiResponse.error(res, "ID is required", 400);
            }

            ({
                name,
                description,
                price,
                discountPrice,
                discountPercentage,
                isActive,
                images,
                categoryId,
                brandId,
                updatedBy
            } = DataSanitize.sanitize({
                name,
                description,
                price,
                discountPrice,
                discountPercentage,
                isActive,
                images,
                categoryId,
                brandId,
                updatedBy
            }));

            const updateProductDtO = new UpdateProductDto(Number(id), name, description, price, isActive, images, categoryId, brandId, updatedBy, discountPrice, discountPercentage)

            const result = await this.productService.updateProduct(updateProductDtO);

            return ApiResponse.success(res, "PRODUCT UPDATED", result);

        } catch (error) {
            next(error);
        }
    };

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            if (!id) {
                return ApiResponse.error(res, "ID is required", 400);
            }

            const result = await this.productService.deleteProduct(Number(id));

            return ApiResponse.success(res, "PRODUCT DELETED", result);

        } catch (error) {
            next(error);
        }
    };
}