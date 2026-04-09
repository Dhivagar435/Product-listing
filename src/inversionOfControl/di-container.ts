import { container } from "tsyringe";
import { CommonRepository } from "../common/repo/common.repo";
import { GlobalException } from "../constant/GlobalExpection";
import { BrandController } from "../modules/brand/controller/brand.controller";
import { BrandService } from "../modules/brand/service/brand.servcie";
import { BrandRepository } from "../modules/brand/repo/brand.repo";
import { CategoryController } from "../modules/category/controller/category.controller";
import { CategoryRepository } from "../modules/category/repo/category.repo";
import { register } from "module";
import { CategoryService } from "../modules/category/service/category.service";
import { ProductController } from "../modules/products/controller/product.controller";
import { ProductService } from "../modules/products/service/product.servcie";
import { ProductRepository } from "../modules/products/repository/product.repo";


container.register("CommonRepository", {
  useClass: CommonRepository,
});

//globalexpection 

container.register("GlobalExpection", {
  useClass: GlobalException
})

//product

container.register("productController", {
  useClass:ProductController
})


container.register("productService",{
  useClass:ProductService
})


container.register("productRepository",{
  useClass:ProductRepository
})


//brand

container.register("brandController",{
  useClass:BrandController
})

container.register("brandService",{
  useClass:BrandService
})


container.register("brandRepository",{
  useClass:BrandRepository
})

//category

container.register("categoryController",{
  useClass:CategoryController
})

container.register("categoryService",{
  useClass:CategoryService
})


container.register("categoryRepository",{
  useClass:CategoryRepository
})
