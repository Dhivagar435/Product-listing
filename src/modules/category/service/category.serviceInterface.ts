import { AddCategoryDto } from "../controller/addCategoryDto";
import { UpdateCategoryDto } from "../controller/updateCategoryDto";


export interface  CategoryServiceInterface {
    addCategory(categoryDTO: AddCategoryDto): Promise<any>;
    updateCategory(categoryDTO: UpdateCategoryDto): Promise<any>;
    deleteCategory(categoryId: number): Promise<any>;
    getCategoryById(categoryId: number): Promise<any>;
    getAllCategories(limit:number, page:number,getAll:boolean): Promise<any>;
}