import { inject, injectable } from "tsyringe";
import { AppError } from "../../../constant/error/App.error";
import { CommonRepository } from "../../../common/repo/common.repo";
import { AddBrandDto } from "../controller/addBrandDto";
import { BrandRepoInterface } from "../repo/brand.repoInterface";
import { UpdateBrandDto } from "../controller/updateBrandDto";

@injectable()
export class BrandService {
    constructor(
        @inject("brandRepository")
        private brandRepository: BrandRepoInterface,

        @inject("CommonRepository")
        private commonRepository: CommonRepository
    ) { }

    addBrand = async (brandDTO: AddBrandDto) => {
        try {

            const existing = await this.commonRepository.findActiveRecord(
                "brand_tbl",
                "name",
                { name: brandDTO.getName() }
            );

            if (existing) {
                throw new AppError("Brand already exists", 400);
            }

            const savedProduct = await this.brandRepository.addBrand(brandDTO,);

            return savedProduct;

        } catch (error) {
            console.log(error, "service product error");

            if (error instanceof AppError) throw error;

            throw new AppError("Failed to add brand", 500, error);
        }
    };


    getAllBrands = async (page: number, limit: number, getAll: boolean): Promise<any> => {
        try {
            const result = await this.brandRepository.getAllBrands(page, limit, getAll);
            const rows = result.data;

            if (!rows || rows.length === 0) {
                return {
                    status: "BRAND_NOT_FOUND",
                    data: []
                };
            }

            return {
                status: "SUCCESS",
                data: rows,
                total: result.total
            };

        } catch (err) {
            console.log(err, "brand service error");

            if (err instanceof AppError) throw err;
            throw new AppError("Failed to get brand", 500, err);
        }
    };

    getBrandById = async (id: number) => {
        try {
            const brand = await this.brandRepository.getBrandById(id);

            if (!brand) {
                throw new AppError("Brand not found", 404);
            }

            return brand;

        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to get brand", 500);
        }
    };

    updateBrand = async (updateBrandDTO: UpdateBrandDto): Promise<any> => {
        try {
            const existingBrand = await this.commonRepository.findActiveRecord(
                "brand_tbl",
                "id",
                { id: updateBrandDTO.getId() }
            );

            if (!existingBrand) {
                return {
                    status: "BRAND_NOT_FOUND"
                };
            }

            //check duplicate name
            const duplicate = await this.commonRepository.findActiveRecord(
                "brand_tbl",
                "name",
                { name: updateBrandDTO.getName() }
            );

            if (duplicate && duplicate.id !== existingBrand.id) {
                throw new AppError("Brand name already exists", 400);
            }

            const updated = await this.brandRepository.updateBrand(updateBrandDTO);

            return {
                status: "SUCCESS",
                data: updated
            };

        } catch (err) {
            console.log(err, "update_brand_service");

            if (err instanceof AppError) throw err;
            throw new AppError("Failed to update Brand", 500, err);
        }
    };

deleteBrand = async (id: number): Promise<any> => {
    try {

        const existingBrand = await this.commonRepository.findActiveRecord(
            "brand_tbl",
            "id",
            { id, isDeleted: 0 } 
        );

        if (!existingBrand) {
            return { status: "BRAND_NOT_FOUND" };
        }

        await this.brandRepository.deleteBrand(id);

        return {
            status: "SUCCESS"
        };

    } catch (err) {
        console.log(err, "delete_brand_service");

        if (err instanceof AppError) throw err;
        throw new AppError("Failed to delete Brand", 500, err);
    }
};
}



