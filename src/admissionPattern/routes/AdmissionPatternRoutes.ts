import express from "express";
import { container } from "tsyringe";
import {  AdmissionPatternController } from "../controller/AdmissionPattern.controller";


const router = express.Router();
const admissionPatternController = container.resolve(AdmissionPatternController)

router.post("/addAdmissionPattern", (req, res) =>admissionPatternController.addAdmissionPattern(req, res))
// router.patch("/updateRoleModuleAccess", (req, res) => roleModuleAccessController.updateRoleModuleAccess(req, res))
router.get("/getAdmissionPattern", (req, res) => admissionPatternController.getAdmissionPattern(req, res))
    
export default router;