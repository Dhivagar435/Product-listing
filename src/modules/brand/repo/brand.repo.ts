import { injectable } from "tsyringe";
import { AppDataSource } from "../../../config/data-source";
import { AddBrandDto } from "../controller/addBrandDto";
import { Brand } from "../entity/brand.entity";
import { UpdateBrandDto } from "../controller/updateBrandDto";


@injectable()
export class BrandRepository {

    private repo = AppDataSource.getRepository(Brand);

    addBrand = async (brandDTO: AddBrandDto) => {
        const brand = this.repo.create({
            name: brandDTO.getName()
        });

        const result = await this.repo.save(brand);
        return result.name;
    };

    updateBrand = async (updateBrandDTO: UpdateBrandDto) => {
        const brand = await this.repo.findOneBy({
            id: updateBrandDTO.getId()
        });

        if (!brand) return null;

        brand.name = updateBrandDTO.getName();

        return await this.repo.save(brand);
    };


    getAllBrands = async (page: number, limit: number, getAll: boolean) => {

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

    getBrandById = async (id: number) => {
        return await this.repo.findOne({
            where: {
                id,
                Cruds: { isDeleted: 0 }
            }
        });
    };

    deleteBrand = async (id: number) => {
        const brand = await this.repo.findOne({
            where: { id }
        });

        if (!brand) return null;
        brand.Cruds.isDeleted = 1;
        brand.Cruds.deletedAt = new Date();

        return await this.repo.save(brand);
    };

}





