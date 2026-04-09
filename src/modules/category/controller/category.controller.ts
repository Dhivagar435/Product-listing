import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { ERORR_MESSAGES } from "../../../constant/message/Error.message";
import { DataSanitize } from "../../../utils/DataSanitize";
import { AddCategoryDto } from "./addCategoryDto";
import { CategoryServiceInterface } from "../service/category.serviceInterface";
import { SUCCESS_MESSAGES } from "../../../constant/message/Success.message";
import { UpdateCategoryDto } from "./updateCategoryDto";





@injectable()
export class CategoryController {
    constructor(@inject("categoryService") private categoryService: CategoryServiceInterface) { }

    addCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let {
                name,
                createdBy } = req.body
            const missingFields = [
                "name",
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
                createdBy
            } = DataSanitize.sanitize({ name, createdBy }));

            const categoryDTO = new AddCategoryDto(name, createdBy)
            const result = await this.categoryService.addCategory(categoryDTO);

            return ApiResponse.success(res, "CATEGORY CREATED", result);
        } catch (error) {
            console.log(error, "controller category error");
            next(error);
        }
    };


       getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const page = Number(req.query.page) || 1;
                const limit = Number(req.query.limit) || 15;
                const getAll = req.query.getAll === "true";
    
                const result = await this.categoryService.getAllCategories(page, limit, getAll);
    
                return ApiResponse.success(res, SUCCESS_MESSAGES.FETCHED, result);
            } catch (error) {
                next(error);
            }
        };
    
    
        getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
    
                if (!id) {
                    return ApiResponse.error(res, "ID is required", 400);
                }
    
                const result = await this.categoryService.getCategoryById(Number(id));
    
                return ApiResponse.success(res, "CATEGORY FETCHED", result);
    
            } catch (error) {
                next(error);
            }
        };
    
    
        updateCategory = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
                let { name, updatedBy } = req.body;
    
                if (!id) {
                    return ApiResponse.error(res, "ID is required", 400);
                }
    
                const missingFields = ["name", "updatedBy"].filter(
                    (field) => req.body[field] === undefined || req.body[field] === null
                );
    
                if (missingFields.length > 0) {
                    return ApiResponse.error(
                        res,
                        `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                        400
                    );
                }
    
                ({ name, updatedBy } = DataSanitize.sanitize({ name, updatedBy }));
    
                const updateCategoryDTO = new UpdateCategoryDto(Number(id), name, updatedBy);
    
                const result = await this.categoryService.updateCategory(updateCategoryDTO);
    
                return ApiResponse.success(res, SUCCESS_MESSAGES.UPDATED, result);
    
            } catch (error) {
                next(error);
            }
        };
    
        deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
    
                if (!id) {
                    return ApiResponse.error(res, "ID is required", 400);
                }
    
                const result = await this.categoryService.deleteCategory(Number(id));
    
                return ApiResponse.success(res, SUCCESS_MESSAGES.DELETED, result);
    
            } catch (error) {
                next(error);
            }
        };
    
}