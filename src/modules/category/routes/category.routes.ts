import express from "express";
import { container } from "tsyringe";
import { CategoryController } from "../controller/category.controller";


const router = express.Router();
const categoryController = container.resolve(CategoryController)

router.post("/", (req, res, next) => categoryController.addCategory(req, res, next))
router.get("/", (req, res, next) => categoryController.getAllCategories(req, res, next));
router.get("/:id", (req, res, next) => categoryController.getCategoryById(req, res, next));
router.patch("/:id", (req, res, next) => categoryController.updateCategory(req, res, next));
router.delete("/:id", (req, res, next) => categoryController.deleteCategory(req, res, next));

export default router;  