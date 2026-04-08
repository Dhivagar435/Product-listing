import { inject, injectable } from "tsyringe";
import { CommonRepository } from "../../common/repo/common.repo";
import { AppError } from "../../constant/error/App.error";
import { AcademicYearRepoMethods } from "../repository/Academic.repoInterface";
import { AddAcademicYearDTO } from "../controller/AddAcademicYearDTO";
import { UpdateAcademicYearDTO } from "../controller/UpdateAcademicYearDTO";


@injectable()
export class AcademicYearService {
    constructor(
        @inject("academicYearRepository") private academicYearRepository: AcademicYearRepoMethods,
        @inject("CommonRepository") private commonRepository: CommonRepository
    ) { }

    addAcademicYear = async (addAcademicYearDTO: AddAcademicYearDTO, idempotencyKey: string) => {
        try {

            const existingKey = await this.commonRepository.findByIdempotency(
                "academic_year_tbl",
                idempotencyKey);

            if (existingKey) {
                return { data: existingKey };
            }

            const existingAcademicYear = await this.commonRepository.findActiveRecord(
                "academic_year_tbl",
                "id",
                {
                    academicYear: addAcademicYearDTO.getAcademicYear(),
                
                });
            if (existingAcademicYear) {
                throw new AppError("Alreday Academic year Created", 400)
            }
            const saveAcademicYear = await this.academicYearRepository.addAcademicYear(addAcademicYearDTO, idempotencyKey);
            return { status: "Success", saveAcademicYear }
        }
        catch (err) {
            console.log(err, "serviceerror")
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to add academic year", 500, err);
        }

    }

    getAcademicYear = async (
        page: number | null,
        limit: number | null,
        getAll: boolean
    ) => {
        try {
            const result = await this.academicYearRepository.getAcademicYear(
                page ?? 1,
                limit ?? 15,
                getAll
            );

            return result;
        } catch (err) {
            throw new AppError("Failed to fetch modules", 500, err);
        }
    };


    updateAdmissionPattern = async (updateAcademicYearDTO: UpdateAcademicYearDTO): Promise<any> => {
        try {
            const existingAcademicYear = await this.commonRepository.findActiveRecord(
                "academic_year_tbl",
                "id",
                { id: updateAcademicYearDTO.getId() },
            );
            if (!existingAcademicYear) {
                throw new AppError("Academic year not Found", 404)
            }
            const duplicateAcademicYear = await this.commonRepository.findActiveRecord(
                "academic_year_tbl",
                "name",
                {
                    academicYear: updateAcademicYearDTO.getAcademicYear(),
                }
            );
            if (duplicateAcademicYear && duplicateAcademicYear.id !== updateAcademicYearDTO.getId()) {
                throw new AppError(`Academic year already exists`, 400);
            }
            const result = await this.academicYearRepository.updateAcademicYear(updateAcademicYearDTO);
            return result

        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to update academic year", 500, err);
        }
    };

    activateAcademicYear = async (id: number) => {
    try {
       
        const existing = await this.commonRepository.findActiveRecord(
            "academic_year_tbl",
            "id",
            { id }
        );

        if (!existing) {
            throw new AppError("Academic year not found", 404);
        }
        await this.academicYearRepository.deactivateAllAcademicYears();
        
        await this.academicYearRepository.activateAcademicYear(id);

        return { status: "Success" };

    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new AppError("Failed to activate academic year", 500, err);
    }
};

}
