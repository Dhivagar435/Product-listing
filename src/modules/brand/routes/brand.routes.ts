import express from "express";
import { container } from "tsyringe";
import { BrandController } from "../controller/brand.controller";
const router = express.Router();
const brandController = container.resolve(BrandController)

router.post("/", (req, res, next) => brandController.addBrand(req, res, next))
router.get("/", (req, res, next) => brandController.getAllBrands(req, res, next));
router.get("/:id", (req, res, next) => brandController.getBrandById(req, res, next));
router.patch("/:id", (req, res, next) => brandController.updateBrand(req, res, next));
router.delete("/:id", (req, res, next) => brandController.deleteBrand(req, res, next)
);
export default router;  