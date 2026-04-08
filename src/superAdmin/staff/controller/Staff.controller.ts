import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { StaffServiceInterface } from "../service/Staff.serviceInterface";
import { ApiResponse } from "../../../utils/ApiResponse";
import { ERORR_MESSAGES } from "../../../constant/message/Error.message";
import { DataSanitize } from "../../../utils/DataSanitize";
import { StaffDTO } from "./StaffDTO";
import { SUCCESS_MESSAGES } from "../../../constant/message/Success.message";
import { StaffStatus } from "../types/Staff.types";
import { UpdateStaffDTO } from "./UpdateStaffDTO";



@injectable()
export class AddStaffController {
    constructor(@inject("StaffService") private StaffService: StaffServiceInterface) { }

    addStaff = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body, "addstafffbodyyy")
        try {
            let { firstName, lastName, email, roleId, dob, phoneNumber, qualification, gender, houseNo, street, city, area, state, pinCode, createdBy } = req.body
         
            const idempotencyKey = req.headers["idempotency-key"] as string;
            if (!idempotencyKey) {
                return ApiResponse.error(res, "Missing Idempotency Key", 400);
            }

            let { subjectIds } = req.body;

            if (subjectIds) {
                if (!Array.isArray(subjectIds)) {
                    subjectIds = [subjectIds];
                }

                subjectIds = subjectIds.map((id: string) => Number(id));
            } else {
                subjectIds = [];
            }

            const missingFields = ["firstName", "lastName", "email", "roleId", "dob", "phoneNumber", "qualification", "gender", "houseNo", "street", "city", "area", "state", "pinCode", "createdBy"].filter(field => !req.body[field]);



            if (missingFields.length > 0) {
                return ApiResponse.error(
                    res,
                    `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                    400
                );
            }
            ({ firstName, lastName, email, roleId, dob, phoneNumber, subjectIds, qualification, street, city, area, state, pinCode, createdBy } = DataSanitize.sanitize({ firstName, lastName, email, roleId, dob, phoneNumber, subjectIds, qualification, gender, houseNo, street, city, area, state, pinCode, createdBy }));

            const staffDTO = new StaffDTO(firstName, lastName, email, roleId, dob, phoneNumber, subjectIds, qualification, gender, houseNo, street, city, area, state, pinCode, createdBy)
            const result = await this.StaffService.addStaff(staffDTO, idempotencyKey);

            // if (result.status === StaffStatus.SUCCESS) {
            return ApiResponse.success(res, "STAFF CREATED", result);
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

    getStaff = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 15;

            const Staff = await this.StaffService.getStaff(page, limit);
            return ApiResponse.success(res, SUCCESS_MESSAGES.FETCHED, Staff);
        } catch (error) {
            next(error)

        }
    }


    updateStaff = async (req: Request, res: Response, next: NextFunction) => {

        console.log(req.body, "update request")

        let { id, firstName, lastName, email, roleId, dob, phoneNumber, qualification, gender, houseNo, street, city, area, state, pinCode, updatedBy } = req.body;

     

        let { subjectIds } = req.body;

        if (subjectIds) {
            if (!Array.isArray(subjectIds)) {
                subjectIds = [subjectIds];
            }

            subjectIds = subjectIds.map((id: string) => Number(id));
        } else {
            subjectIds = [];
        }

        const missingFields = ["id", "firstName", "lastName", "email", "roleId", "dob", "phoneNumber", "qualification", "gender", "houseNo", "street", "city", "area", "state", "pinCode", "updatedBy"].filter(
            (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
            return ApiResponse.error(
                res,
                `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                400
            );
        }
        // try {
        ({ id, firstName, lastName, email, roleId, dob, phoneNumber, subjectIds, qualification, gender, houseNo, street, city, area, state, pinCode, updatedBy } = DataSanitize.sanitize({ id, firstName, lastName, email, roleId, dob, phoneNumber, subjectIds, qualification, gender, houseNo, street, city, area, state, pinCode, updatedBy }));
        // } catch (sanitizeError: unknown) {

        //     return ApiResponse.error(res, StaffStatus.INVALID_INPUT, 400);
        // }

        const updateStaffDTO = new UpdateStaffDTO(id, firstName, lastName, email, roleId, dob, phoneNumber, qualification, gender, houseNo, street, city, area, state, pinCode, updatedBy,subjectIds)
        const result = await this.StaffService.updateStaff(updateStaffDTO);

        if (result.status === StaffStatus.SUCCESS) {
            return ApiResponse.success(res, SUCCESS_MESSAGES.UPDATED);

        }
    }
}