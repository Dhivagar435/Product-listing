import { AddCategoryDto } from "../controller/addCategoryDto";
import { UpdateCategoryDto } from "../controller/updateCategoryDto";


export interface CategoryRepoInterface {
    addCategory(categoryDTO: AddCategoryDto): Promise<any>;
    updateCategory(categoryDTO:UpdateCategoryDto): Promise<any>;
    deleteCategory(categoryId: number): Promise<any>;
    getCategoryById(categoryId: number): Promise<any>;
    getAllCategories(page:number,limit:number,getAll:boolean): Promise<any>;
}