import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { AdminServiceInterface } from "../service/Admin.serviceInterface";
import { ApiResponse } from "../../utils/ApiResponse";
import { DataSanitize } from "../../utils/DataSanitize";
import { ERORR_MESSAGES } from "../../constant/message/Error.message";
import { AddAdminDto } from "./AddAdminDTO";
import { SUCCESS_MESSAGES } from "../../constant/message/Success.message";



@injectable()
export class AdminController {
    constructor(@inject("adminService") private adminService: AdminServiceInterface) { }

    addAdmin = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body, "addadminbodyyy")
        try {
            let { firstName, lastName, email, dob, phoneNumber, gender, address1, address2, state, pinCode, createdBy } = req.body
            // const photoName = req.file?.filename;
            console.log(req.headers)
            const idempotencyKey = req.headers["idempotency-key"] as string;
            if (!idempotencyKey) {
                return ApiResponse.error(res, "Missing Idempotency Key", 400);
            }



            const missingFields = ["firstName", "lastName", "email", "roleId", "dob", "phoneNumber", "qualification", "gender", "address1", "state", "pinCode", "createdBy"].filter(field => !req.body[field]);



            if (missingFields.length > 0) {
                return ApiResponse.error(
                    res,
                    `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                    400
                );
            }
            ({ firstName, lastName, email, dob, phoneNumber, gender, address1, state, pinCode, createdBy } = DataSanitize.sanitize({ firstName, lastName, email, dob, phoneNumber, gender, address1, state, pinCode, createdBy }));

            const adminDTO = new AddAdminDto(firstName, lastName, email, phoneNumber, gender, dob, address1, state, pinCode, createdBy,address2)
            const result = await this.adminService.addAdmin(adminDTO, idempotencyKey);

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

    getAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 15;
              const getAll = req.query.getAll === "true";

            const Staff = await this.adminService.getAdmin(page, limit,getAll);
            return ApiResponse.success(res, SUCCESS_MESSAGES.FETCHED, Staff);
        } catch (error) {
            next(error)

        }
    }


    // updateStaff = async (req: Request, res: Response, next: NextFunction) => {

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