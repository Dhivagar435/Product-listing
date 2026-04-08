import { inject, injectable } from "tsyringe";
import { AdmissionPatternServiceMethods } from "../service/AdmissionPattern.serviceInterface";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ERORR_MESSAGES } from "../../constant/message/Error.message";
import { SUCCESS_MESSAGES } from "../../constant/message/Success.message";
import { DataSanitize } from "../../utils/DataSanitize";
import { AppError } from "../../constant/error/App.error";
import { AddAdmissionDtO } from "./AddAdmissionPatternDTO";
import { UpdateAdmissionDtO } from "./UpdateAdmissionPatternDTO";
import { AutoGenerateAdmissionDTO } from "./GenerateAdmissionPatternDTO";
@injectable()
export class AdmissionPatternController {
    constructor(
        @inject("admissionPatternService") private admissionPatternService: AdmissionPatternServiceMethods
    ) { }

    addAdmissionPattern = async (req: Request, res: Response) => {

        let { prefix, middleName, startSequence, createdBy } = req.body;

        const idempotencyKey = req.headers["idempotency-key"] as string;

        if (!idempotencyKey) {
            throw new AppError("Missing Idempotency Key", 400);
        }

        const missingFields = ["prefix", "middleName", "startSequence","createdBy"].filter(
            (field) => !req.body[field],
        );

        if (missingFields.length > 0) {
            throw new AppError(`${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                400,
            );
        }

        ({ prefix, middleName, startSequence,createdBy } = DataSanitize.sanitize({ prefix, middleName, startSequence,createdBy }));
        const addAdmissionDtO = new AddAdmissionDtO(prefix, middleName, startSequence,createdBy)

        const result = await this.admissionPatternService.addAdmissionPattern(addAdmissionDtO, idempotencyKey);

        return ApiResponse.success(
            res,
            SUCCESS_MESSAGES.CREATED,
            result,
            201
        );
    }

    updateAdmissionPattern = async (req: Request, res: Response) => {

        let { id, prefix, middleName, startSequence, year, updatedBy } = req.body;

        const missingFields = ["id", "prefix", "middleName", "startSequence", "year", "updatedBy"].filter(
            (field) => !req.body[field],
        );

        if (missingFields.length > 0) {
            throw new AppError(`${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                400,
            );
        }

        ({ id, prefix, middleName, startSequence, year, updatedBy } = DataSanitize.sanitize({ id, prefix, middleName, startSequence, year, updatedBy }));
        const updateAdmissionPatternDtO = new UpdateAdmissionDtO(id, prefix, middleName, startSequence, updatedBy)

        const result = await this.admissionPatternService.updateAdmissionPattern(updateAdmissionPatternDtO);

        return ApiResponse.success(
            res,
            SUCCESS_MESSAGES.CREATED,
            result,
            201
        );
    }


    getAdmissionPattern = async (req: Request, res: Response) => {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 15;
        const getAll = req.query.getAll === "true";

        const Modules = await this.admissionPatternService.getAdmissionPattern(page, limit, getAll);
        return ApiResponse.success(res, SUCCESS_MESSAGES.FETCHED, Modules);

    }

    getAutoAdmissionNumber = async (req: Request, res: Response) => {
        const { patternId } = req.params;
        if (!patternId) throw new AppError("Pattern ID is required", 400);

       const generateAdmissionPatternDTO = new AutoGenerateAdmissionDTO(Number(patternId));

        const admissionNumber = await this.admissionPatternService.generateAutoAdmissionNumber(generateAdmissionPatternDTO);
        return ApiResponse.success(res, SUCCESS_MESSAGES.FETCHED, admissionNumber);
    };

}