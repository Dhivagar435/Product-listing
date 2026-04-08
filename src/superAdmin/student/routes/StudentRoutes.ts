import express from "express";
import { container } from "tsyringe";

import { StudentController } from "../controller/Student.controller";

const router = express.Router();
const studentController = container.resolve(StudentController)

router.post("/addStudent", (req, res, next) => studentController.addStudent(req, res, next))
router.get("/getStudent", (req, res, next) => studentController.getStudent(req, res, next))
// router.patch("/updateStaff", multerErrorHandler(uploadImage("staff").single("photo")), (req, res, next) => staffController.updateStaff(req, res, next))
// router.delete("/deleteStaff")
export default router;