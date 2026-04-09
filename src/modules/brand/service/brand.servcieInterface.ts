import { AddBrandDto } from "../controller/addBrandDto";
import { UpdateBrandDto } from "../controller/updateBrandDto";

export interface BrandServiceInterface {
    addBrand(brandDTO: AddBrandDto): Promise<any>;
    updateBrand(brandDTO: UpdateBrandDto): Promise<any>;
    deleteBrand(brandId: number): Promise<any>;
    getBrandById(brandId: number): Promise<any>;
    getAllBrands(page:number,limit:number,getAll:boolean): Promise<any>;
}