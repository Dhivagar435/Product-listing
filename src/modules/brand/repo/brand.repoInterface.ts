import { AddBrandDto } from "../controller/addBrandDto";
import { UpdateBrandDto } from "../controller/updateBrandDto";

export interface BrandRepoInterface {
    addBrand(addbrandDTO: AddBrandDto): Promise<any>;
    updateBrand(updatebrandDTO:UpdateBrandDto): Promise<any>;
    deleteBrand(brandId: number): Promise<any>;
    getBrandById(brandId: number): Promise<any>;
    getAllBrands(page:number,limit:number,getAll:boolean): Promise<any>;
}