import { Category } from './../entity/category.entity';
import { injectable } from "tsyringe";
import { AppDataSource } from "../../../config/data-source";
import { AddCategoryDto } from '../controller/addCategoryDto';
import { UpdateCategoryDto } from '../controller/updateCategoryDto';



@injectable()
export class CategoryRepository {

    private repo = AppDataSource.getRepository(Category);

    addCategory = async (categoryDTO: AddCategoryDto) => {
        const category = this.repo.create({
            name: categoryDTO.getName()
        });

        const result = await this.repo.save(category);
        return result.name;
    };

      updateCategory = async (updateCategoryDTO: UpdateCategoryDto) => {
            const category = await this.repo.findOneBy({
                id: updateCategoryDTO.getId()
            });
    
            if (!category) return null;
    
            category.name = updateCategoryDTO.getName();
    
            return await this.repo.save(category);
        };
    
    
        getAllCategories = async (page: number, limit: number, getAll: boolean) => {
    
            if (getAll) {
                const data = await this.repo.find({
                    where: {
                        Cruds: { isDeleted: 0 }
                    },
                    order: { id: "DESC" }
                });
    
                return { data, total: data.length };
            }
    
            const [data, total] = await this.repo.findAndCount({
                where: {
                    Cruds: { isDeleted: 0 }
                },
                skip: (page - 1) * limit,
                take: limit,
                order: { id: "DESC" }
            });
    
            return { data, total };
        };
    
        getCategoryById = async (id: number) => {
            return await this.repo.findOne({
                where: {
                    id,
                    Cruds: { isDeleted: 0 }
                }
            });
        };
    
        deleteCategory = async (id: number) => {
            const category = await this.repo.findOne({
                where: { id }
            });
    
            if (!category) return null;
            category.Cruds.isDeleted = 1;
            category.Cruds.deletedAt = new Date();
    
            return await this.repo.save(category);
        };
}





