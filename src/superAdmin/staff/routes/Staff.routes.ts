import express from "express";
import { container } from "tsyringe";
import { AddStaffController } from "../controller/Staff.controller";


const router = express.Router();
const staffController = container.resolve(AddStaffController)

router.post("/addStaff", (req, res, next) => staffController.addStaff(req, res, next))
router.get("/getStaff", (req, res, next) => staffController.getStaff(req, res, next))
router.patch("/updateStaff",(req, res, next) => staffController.updateStaff(req, res, next))
export default router;