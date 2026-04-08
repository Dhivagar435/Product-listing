import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../../utils/ApiResponse";
import { ERORR_MESSAGES } from "../../../constant/message/Error.message";
import { DataSanitize } from "../../../utils/DataSanitize";

import { SUCCESS_MESSAGES } from "../../../constant/message/Success.message";

import { StaffStudentInterface } from "../service/Student.serviceInterface";
import { StudentAddDTO } from "./StudentAddDTO";



@injectable()
export class StudentController {
    constructor(@inject("StudentService") private StudentService: StaffStudentInterface) { }

    addStudent = async (req: Request, res: Response, next: NextFunction) => {

        try {
            let { firstName,
                lastName,
                admissionNumber,
                admissionPatternId,
                email,
                phoneNumber,
                dob,
                whatsappNumber,
                standardId,
                sectionId,
                typeofParental,
                houseNo,
                street,
                area,
                city,
                state,
                pinCode,
                motherName,
                motherOccupation,
                fatherName,
                fatherOccupation,
                guardianName,
                guardianOccupation,
                gender,
                rollNumber,
                userName,
                createdBy } = req.body
            console.log(req.body, "addstudentbodyyy")
        
            console.log(req.headers)
            const idempotencyKey = req.headers["idempotency-key"] as string;
            if (!idempotencyKey) {
                return ApiResponse.error(res, "Missing Idempotency Key", 400);
            }
            const missingFields = ["firstName", "admissionPatternId", "admissionNumber", "lastName", "email", "dob", "phoneNumber", "gender", "createdBy"].filter(field => !req.body[field]);



            if (missingFields.length > 0) {
                return ApiResponse.error(
                    res,
                    `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                    400
                );
            }
            ({
                firstName,
                lastName,
                admissionNumber,
                admissionPatternId,
                email,
                phoneNumber,
                dob,
                whatsappNumber,
                standardId,
                sectionId,
                typeofParental,
                houseNo,
                street,
                area,
                city,
                state,
                pinCode,
                motherName,
                motherOccupation,
                fatherName,
                fatherOccupation,
                guardianName,
                guardianOccupation,
                gender,
                rollNumber,
                userName,
                createdBy
            } = DataSanitize.sanitize({
                firstName,
                lastName,
                admissionNumber,
                admissionPatternId,
                email,
                phoneNumber,
                dob,
                whatsappNumber,
                standardId,
                sectionId,
                typeofParental,
                houseNo,
                street,
                area,
                city,
                state,
                pinCode,
                motherName,
                motherOccupation,
                fatherName,
                fatherOccupation,
                guardianName,
                guardianOccupation,
                gender,
                rollNumber,
                userName,
                createdBy
            }));

            const studentDTO = new StudentAddDTO(
                firstName,
                lastName,
                admissionNumber,
                admissionPatternId,
                email,
                phoneNumber,
                dob,
                standardId,
                sectionId,
                typeofParental,
                houseNo,
                street,
                area,
                city,
                state,
                pinCode,
                gender,
                rollNumber,
                userName,
                createdBy,
                whatsappNumber,
                motherName,
                motherOccupation,
                fatherName,
                fatherOccupation,
                guardianName,
                guardianOccupation,
             )
            const result = await this.StudentService.addStaff(studentDTO, idempotencyKey);

            // if (result.status === StaffStatus.SUCCESS) {
            return ApiResponse.success(res, "STUDENT CREATED", result);
            // }
            // else {
            //     return ApiResponse.error(res, "Something went wrong", 500);
            // }

        }

        catch (error) {
            console.log(error, "controllererror")
            next(error)
        }
    }

    getStudent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 15;

            const Staff = await this.StudentService.getStudent(page, limit);
            return ApiResponse.success(res, SUCCESS_MESSAGES.FETCHED, Staff);
        } catch (error) {
            next(error)

        }
    }


    // updateStudent = async (req: Request, res: Response, next: NextFunction) => {

    //     console.log(req.body, "update request")

    //     let { id, firstName, lastName, email, roleId, dob, phoneNumber, qualification, gender, houseNo, street, city, area, state, pinCode, updatedBy } = req.body;

    //     const photoName = req.file?.filename;

    //     let { subjectIds } = req.body;

    //     if (subjectIds) {
    //         if (!Array.isArray(subjectIds)) {
    //             subjectIds = [subjectIds];
    //         }

    //         subjectIds = subjectIds.map((id: string) => Number(id));
    //     } else {
    //         subjectIds = [];
    //     }

    //     const missingFields = ["id", "firstName", "lastName", "email", "roleId", "dob", "phoneNumber", "qualification", "gender", "houseNo", "street", "city", "area", "state", "pinCode", "updatedBy"].filter(
    //         (field) => !req.body[field]
    //     );

    //     if (missingFields.length > 0) {
    //         return ApiResponse.error(
    //             res,
    //             `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
    //             400
    //         );
    //     }
    //     // try {
    //     ({ id, firstName, lastName, email, roleId, dob, phoneNumber, subjectIds, qualification, gender, houseNo, street, city, area, state, pinCode, updatedBy } = DataSanitize.sanitize({ id, firstName, lastName, email, roleId, dob, phoneNumber, subjectIds, qualification, gender, houseNo, street, city, area, state, pinCode, updatedBy }));
    //     // } catch (sanitizeError: unknown) {

    //     //     return ApiResponse.error(res, StaffStatus.INVALID_INPUT, 400);
    //     // }

    //     const updateStaffDTO = new UpdateStaffDTO(id, firstName, lastName, email, roleId, dob, phoneNumber, qualification, gender, houseNo, street, city, area, state, pinCode, updatedBy, photoName, subjectIds)
    //     const result = await this.StaffService.updateStaff(updateStaffDTO);

    //     if (result.status === StaffStatus.SUCCESS) {
    //         return ApiResponse.success(res, SUCCESS_MESSAGES.UPDATED);

    //     }
    // }
}