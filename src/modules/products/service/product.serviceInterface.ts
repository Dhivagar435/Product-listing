import { AnyARecord } from "node:dns";
import { AddProductDto } from "../controller/addProductDto";
import { UpdateProductDto } from "../controller/updateProductDto";

export interface ProductServiceInterface {
    addProduct(productDTO: AddProductDto): Promise<any>;
    updateProduct(productDTO:UpdateProductDto): Promise<any>;
    deleteProduct(productId: number): Promise<any>;
    getProductById(productId: number): Promise<any>;
    getProducts(page:number,limit:number,q:string): Promise<any>;
}