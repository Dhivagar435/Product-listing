import express from "express";
import { container } from "tsyringe";
import { ProductController } from "../controller/product.controller";


const router = express.Router();
const productController = container.resolve(ProductController)

router.post("/", (req, res, next) => productController.addProduct(req, res, next))
router.get("/", (req, res, next) => productController.getProducts(req, res, next));
router.get("/:id", (req, res, next) =>productController.getProductById(req, res, next));
router.patch("/:id", (req, res, next) => productController.updateProduct(req, res, next));
router.delete("/:id", (req, res, next) => productController.deleteProduct(req, res, next));

export default router;  