import express from "express";
import { container } from "tsyringe";
import { AcademicYearController } from "../controller/AcademicYear.controller";



const router = express.Router();
const academicYearController = container.resolve(AcademicYearController)

router.post("/addAcademicYear", (req, res) => academicYearController.addAcademicYear(req, res))
router.patch("/updateAcademicYear", (req, res) => academicYearController.updateAcademicyear(req, res))
router.get("/getAcademicYear", (req, res) => academicYearController.getAcademicYear(req, res))
router.patch("/activate/:id", academicYearController.activateAcademicYear);
export default router;