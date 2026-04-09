import { inject, injectable } from "tsyringe";
import { AppError } from "../../../constant/error/App.error";
import { CommonRepository } from "../../../common/repo/common.repo";
import { AddCategoryDto } from "../controller/addCategoryDto";
import { CategoryRepoInterface } from "../repo/category.repoInterface";
import { UpdateCategoryDto } from "../controller/updateCategoryDto";

@injectable()
export class CategoryService {
    constructor(
        @inject("categoryRepository")
        private categoryRepository: CategoryRepoInterface,

        @inject("CommonRepository")
        private commonRepository: CommonRepository
    ) { }

    addCategory = async (categoryDTO: AddCategoryDto) => {
        try {

            const existing = await this.commonRepository.findActiveRecord(
                "category_tbl",
                "name",
                { name: categoryDTO.getName() }
            );

            if (existing) {
                throw new AppError("Category already exists", 400);
            }

            const savedProduct = await this.categoryRepository.addCategory(categoryDTO);

            return savedProduct;

        } catch (error) {
            console.log(error, "service category error");

            if (error instanceof AppError) throw error;

            throw new AppError("Failed to add Category", 500, error);
        }
    };

    getAllCategories = async (page: number, limit: number, getAll: boolean): Promise<any> => {
        try {
            const result = await this.categoryRepository.getAllCategories(page, limit, getAll);
            const rows = result.data;

            if (!rows || rows.length === 0) {
                return {
                    status: "CATEGORY_NOT_FOUND",
                    data: []
                };
            }

            return {
                status: "SUCCESS",
                data: rows,
                total: result.total
            };

        } catch (err) {
            console.log(err, "category service error");

            if (err instanceof AppError) throw err;
            throw new AppError("Failed to get category", 500, err);
        }
    };

    getCategoryById = async (id: number) => {
        try {
            const category = await this.categoryRepository.getCategoryById(id);

            if (!category) {
                throw new AppError("Category not found", 404);
            }

            return category;

        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to get category", 500);
        }
    };

    updateCategory = async (updateCategoryDTO: UpdateCategoryDto): Promise<any> => {
        try {
            const existingCategory = await this.commonRepository.findActiveRecord(
                "category_tbl",
                "id",
                { id: updateCategoryDTO.getId() }
            );

            if (!existingCategory) {
                return {
                    status: "CATEGORY_NOT_FOUND"
                };
            }

            //check duplicate name
            const duplicate = await this.commonRepository.findActiveRecord(
                "brand_tbl",
                "name",
                { name: updateCategoryDTO.getName() }
            );

            if (duplicate && duplicate.id !== existingCategory.id) {
                throw new AppError("Category name already exists", 400);
            }

            const updated = await this.categoryRepository.updateCategory(updateCategoryDTO);

            return {
                status: "SUCCESS",
                data: updated
            };

        } catch (err) {
            console.log(err, "update_category_service");

            if (err instanceof AppError) throw err;
            throw new AppError("Failed to update Category", 500, err);
        }
    };

    deleteCategory = async (id: number): Promise<any> => {
        try {

            const existingCategory = await this.commonRepository.findActiveRecord(
                "category_tbl",
                "id",
                { id, isDeleted: 0 }
            );

            if (!existingCategory) {
                return { status: "CATEGORY_NOT_FOUND" };
            }

            await this.categoryRepository.deleteCategory(id);

            return {
                status: "SUCCESS"
            };

        } catch (err) {
            console.log(err, "delete_category_service");

            if (err instanceof AppError) throw err;
            throw new AppError("Failed to delete Category", 500, err);
        }
    };
}



