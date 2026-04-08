import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ERORR_MESSAGES } from "../../constant/message/Error.message";
import { SUCCESS_MESSAGES } from "../../constant/message/Success.message";
import { DataSanitize } from "../../utils/DataSanitize";
import { AppError } from "../../constant/error/App.error";
import { AcademicYearServiceMethods } from "../service/Academic.serviceInterface";
import { AddAcademicYearDTO } from "./AddAcademicYearDTO";
import { UpdateAcademicYearDTO } from "./UpdateAcademicYearDTO";

@injectable()
export class AcademicYearController {
    constructor(
        @inject("academicYearService") private academicYearService: AcademicYearServiceMethods
    ) { }

    addAcademicYear = async (req: Request, res: Response) => {

        let { academicYear, startDate, endDate, createdBy } = req.body;

        const idempotencyKey = req.headers["idempotency-key"] as string;

        if (!idempotencyKey) {
            throw new AppError("Missing Idempotency Key", 400);
        }

        const missingFields = ["academicYear", "startDate", "endDate", "createdBy"].filter(
            (field) => !req.body[field],
        );

        if (missingFields.length > 0) {
            throw new AppError(`${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                400,
            );
        }

        ({ academicYear, startDate, endDate, createdBy } = DataSanitize.sanitize({ academicYear, startDate, endDate, createdBy }));
        const addAcademicYearDTO = new AddAcademicYearDTO(academicYear, startDate, endDate, createdBy)

        const result = await this.academicYearService.addAcademicYear(addAcademicYearDTO, idempotencyKey);

        return ApiResponse.success(
            res,
            SUCCESS_MESSAGES.CREATED,
            result,
            201
        );
    }

    updateAcademicyear = async (req: Request, res: Response) => {

        let { id, academicYear, startDate, endDate, updatedBy } = req.body;

        const missingFields = ["id", "academicYear", "startDate", "endDate", "updatedBy"].filter(
            (field) => !req.body[field],
        );

        if (missingFields.length > 0) {
            throw new AppError(`${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                400,
            );
        }

        ({ id, academicYear, startDate, endDate, updatedBy } = DataSanitize.sanitize({ id, academicYear, startDate, endDate, updatedBy }));
        const updateAcademicYearDTO = new UpdateAcademicYearDTO(id, academicYear, startDate, endDate, updatedBy)

        const result = await this.academicYearService.updateAcademicYear(updateAcademicYearDTO);

        return ApiResponse.success(
            res,
            SUCCESS_MESSAGES.CREATED,
            result,
            201
        );
    }


    getAcademicYear = async (req: Request, res: Response) => {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 15;
        const getAll = req.query.getAll === "true";

        const Modules = await this.academicYearService.getAcademicYear(page, limit, getAll);
        return ApiResponse.success(res, SUCCESS_MESSAGES.FETCHED, Modules);

    }

    activateAcademicYear = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (!id) {
            throw new AppError("Invalid academic year id", 400);
        }

        const result = await this.academicYearService.activateAcademicYear(id);

        return ApiResponse.success(
            res,
            "Academic year activated successfully",
            result
        );
    };
}
