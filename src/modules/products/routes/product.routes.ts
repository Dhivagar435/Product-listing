import express from "express";
import { container } from "tsyringe";
import { ProductController } from "../controller/product.controller";
import { uploadProductImages } from "../../../upload.middleware";



const router = express.Router();
const productController = container.resolve(ProductController)

router.post("/", uploadProductImages, (req, res, next) => productController.addProduct(req, res, next))
router.get("/", (req, res, next) => productController.getProducts(req, res, next));
router.get("/:id", (req, res, next) => productController.getProductById(req, res, next));
router.patch("/:id", uploadProductImages, (req, res, next) => productController.updateProduct(req, res, next));
router.delete("/:id", (req, res, next) => productController.deleteProduct(req, res, next));

export default router;  