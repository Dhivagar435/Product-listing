import { inject, injectable } from "tsyringe";
import { AdmissionPatterRepoMethods } from "../repository/AdmissionPattern.repoInterface";
import { UpdateAdmissionDtO } from "../controller/UpdateAdmissionPatternDTO";
import { CommonRepository } from "../../common/repo/common.repo";
import { AppError } from "../../constant/error/App.error";
import { AddAdmissionDtO } from "../controller/AddAdmissionPatternDTO";
import { AutoGenerateAdmissionDTO } from "../controller/GenerateAdmissionPatternDTO";

@injectable()
export class AdmissionPatternService {
    constructor(
        @inject("admissionPatternRepository") private admissionPatternRepository: AdmissionPatterRepoMethods,
        @inject("CommonRepository") private commonRepository: CommonRepository
    ) { }

    addAdmissionPattern = async (addAdmissionPatternDTO: AddAdmissionDtO, idempotencyKey: string) => {
        try {

            const existingKey = await this.commonRepository.findByIdempotency(
                "admission_pattern_tbl",
                idempotencyKey);

            if (existingKey) {
                return { data: existingKey };
            }

            //check active academic year
            const activeYear = await this.commonRepository.findActiveRecord(
                "academic_year_tbl",
                "id",
                { isActive: true }
            );

            if (!activeYear) {
                throw new AppError("No active academic year found", 400);
            }

            //set pattern for active year
            addAdmissionPatternDTO.setAcademicYearId(activeYear.id);

            //check duplicate for that year pattern exist or not

            const existingPattern = await this.commonRepository.findActiveRecord(
                "admission_pattern_tbl",
                "id",
                { academicYearId: activeYear.id }
            );

            if (existingPattern) {
                throw new AppError("Pattern already exists for this academic year", 400);
            }
            const savePattern = await this.admissionPatternRepository.addAdmissionPattern(addAdmissionPatternDTO, idempotencyKey);
            return { status: "Success", savePattern }
        }
        catch (err) {
            console.log(err, "serviceerror")
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to add admission pattern", 500, err);
        }

    }

    getAdmissionPattern = async (
        page: number | null,
        limit: number | null,
        getAll: boolean
    ) => {
        try {
            const result = await this.admissionPatternRepository.getAdmissionPattern(
                page ?? 1,
                limit ?? 15,
                getAll
            );

            return result;
        } catch (err) 
        {
              console.log(err,"servicepattern")
            throw new AppError("Failed to fetch modules", 500, err);
        }
    };


    updateAdmissionPattern = async (updateAdmissionPatternDTO: UpdateAdmissionDtO): Promise<any> => {
        try {
            const existingAdmissionPattern = await this.commonRepository.findActiveRecord(
                "admission_pattern_tbl",
                "id",
                { id: updateAdmissionPatternDTO.getId() },
            );
            if (!existingAdmissionPattern) {
                throw new AppError("Admission pattern not Found", 404)
            }
            const duplicateAdmissionPattern = await this.commonRepository.findActiveRecord(
                "admission_pattern_tbl",
                "name",
                {
                    prefix: updateAdmissionPatternDTO.getPrefix(),
                    middleName: updateAdmissionPatternDTO.getMiddleName(),
                    startSequence: updateAdmissionPatternDTO.getStartSequence()
                }
            );
            if (duplicateAdmissionPattern && duplicateAdmissionPattern.id !== updateAdmissionPatternDTO.getId()) {
                throw new AppError(`Admission Pattern"${updateAdmissionPatternDTO.getStartSequence()}" already exists`, 400);
            }
            const result = await this.admissionPatternRepository.updateAdmissionPattern(updateAdmissionPatternDTO);
            return result

        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to update admission pattern", 500, err);
        }
    };

    generateAutoAdmissionNumber = async (generateAdmissionPatternDTO: AutoGenerateAdmissionDTO): Promise<string> => {

        const pattern = await this.admissionPatternRepository.getAdmissionPatternById(generateAdmissionPatternDTO);
        if (!pattern) throw new AppError("Admission pattern not found", 404);

        const lastSeq = await this.admissionPatternRepository.getMaxAssignedSequence(generateAdmissionPatternDTO);
        const nextSeq = lastSeq + 1;
        return `${pattern.prefix}${pattern.middleName || ""}${String(nextSeq).padStart(4, "0")}`;
    };
}
