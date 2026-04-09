import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { ERORR_MESSAGES } from "../../../constant/message/Error.message";
import { DataSanitize } from "../../../utils/DataSanitize";
import { BrandServiceInterface } from "../service/brand.servcieInterface";
import { AddBrandDto } from "./addBrandDto";
import { UpdateBrandDto } from "./updateBrandDto";
import { SUCCESS_MESSAGES } from "../../../constant/message/Success.message";





@injectable()
export class BrandController {
    constructor(@inject("brandService") private brandService: BrandServiceInterface) { }

    addBrand = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let {
                name,
                createdBy } = req.body
            const missingFields = [
                "name",
                "createdBy"].filter(field => req.body[field] === undefined || req.body[field] === null)

            if (missingFields.length > 0) {
                return ApiResponse.error(
                    res,
                    `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                    400
                );
            }
            ({
                name,
                createdBy
            } = DataSanitize.sanitize({ name, createdBy }));

            const brandDTO = new AddBrandDto(name, createdBy)
            const result = await this.brandService.addBrand(brandDTO);

            return ApiResponse.success(res, "BRAND CREATED", result);
        } catch (error) {
            next(error);
        }
    };


    getAllBrands = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 15;
            const getAll = req.query.getAll === "true";

            const result = await this.brandService.getAllBrands(page, limit, getAll);

            return ApiResponse.success(res, SUCCESS_MESSAGES.FETCHED, result);
        } catch (error) {
            next(error);
        }
    };


    getBrandById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            if (!id) {
                return ApiResponse.error(res, "ID is required", 400);
            }

            const result = await this.brandService.getBrandById(Number(id));

            return ApiResponse.success(res, "BRAND FETCHED", result);

        } catch (error) {
            next(error);
        }
    };


    updateBrand = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            let { name, updatedBy } = req.body;

            if (!id) {
                return ApiResponse.error(res, "ID is required", 400);
            }

            const missingFields = ["name", "updatedBy"].filter(
                (field) => req.body[field] === undefined || req.body[field] === null
            );

            if (missingFields.length > 0) {
                return ApiResponse.error(
                    res,
                    `${ERORR_MESSAGES.MISSING_FIELD}: ${missingFields.join(", ")}`,
                    400
                );
            }

            ({ name, updatedBy } = DataSanitize.sanitize({ name, updatedBy }));

            const updateBrandDTO = new UpdateBrandDto(Number(id), name, updatedBy);

            const result = await this.brandService.updateBrand(updateBrandDTO);

            return ApiResponse.success(res, SUCCESS_MESSAGES.UPDATED, result);

        } catch (error) {
            next(error);
        }
    };

    deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            if (!id) {
                return ApiResponse.error(res, "ID is required", 400);
            }

            const result = await this.brandService.deleteBrand(Number(id));

            return ApiResponse.success(res, SUCCESS_MESSAGES.DELETED, result);

        } catch (error) {
            next(error);
        }
    };



}