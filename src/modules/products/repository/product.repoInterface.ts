import { Category } from './../../category/entity/category.entity';
import { AddProductDto } from "../controller/addProductDto";
import { Brand } from '../../brand/entity/brand.entity';
import { UpdateProductDto } from '../controller/updateProductDto';
import { Product } from '../entity/product.entity';

export interface ProductRepoInterface {
    addProduct(productDTO: AddProductDto, category: Category, brand: Brand): Promise<any>;
    updateProduct(product:Product,productDTO: UpdateProductDto,category:Category,brand:Brand): Promise<any>;
    deleteProduct(productId: number): Promise<any>;
    getProductById(productId: number): Promise<any>;
    getProducts(page: number, limit: number, q: string,categoryId?: number): Promise<any>;
}