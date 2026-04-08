import { injectable } from "tsyringe";
import { AppDataSource } from "../../config/data-source";
import { AddAdmissionDtO } from "../controller/AddAdmissionPatternDTO";
import { UpdateAdmissionDtO } from "../controller/UpdateAdmissionPatternDTO";
import { AutoGenerateAdmissionDTO } from "../controller/GenerateAdmissionPatternDTO";


@injectable()
export class AdmissionPatternRepository {

    addAdmissionPattern = async (addAdmissionPatternDto: AddAdmissionDtO, idempotencyKey: string): Promise<any> => {
        return AppDataSource.manager.query(
            `INSERT into admission_pattern_tbl(prefix,middleName,startSequence, academicYearId,createdBy,idempotency) VALUES(?,?,?,?,?,?)`, [addAdmissionPatternDto.getPrefix(), addAdmissionPatternDto.getMiddleName(), addAdmissionPatternDto.getStartSequence(), addAdmissionPatternDto.getAcademicYearId(),addAdmissionPatternDto.getCreatedBy(), idempotencyKey]
        )
    }

    getAdmissionPattern = async (
        page?: number,
        limit?: number
    ): Promise<any> => {

        let dataQuery = `
    SELECT 
      id,
      prefix,
      middleName,
      startSequence
    FROM admission_pattern_tbl
    WHERE isDeleted = 0
    ORDER BY updatedAt
  `;

        let countQuery = `
    SELECT COUNT(*) as total
    FROM admission_pattern_tbl
    WHERE isDeleted = 0
  `;

        const params: any[] = [];

        const paginate =
            typeof page === "number" &&
            typeof limit === "number";

        if (paginate) {
            const offset = (page - 1) * limit;
            dataQuery += ` LIMIT ? OFFSET ?`;
            params.push(limit, offset);
        }

        const dataResult = await AppDataSource.manager.query(
            dataQuery,
            params
        );

        if (!paginate) {
            return dataResult;
        }

        const countResult = await AppDataSource.manager.query(countQuery);

        return {
            data: dataResult,
            total: countResult[0].total,
            page,
            limit,
        };
    };

    updateAdmissionPattern = async (updateAdmissionPatternDTO: UpdateAdmissionDtO): Promise<any> => {
        const query = `UPDATE admission_pattern_tbl
           SET prefix = ?, middleName=? , startSequence=?,updatedBy = ? 
           WHERE id = ? `;
        const values = [updateAdmissionPatternDTO.getPrefix(), updateAdmissionPatternDTO.getMiddleName(), updateAdmissionPatternDTO.getStartSequence(), updateAdmissionPatternDTO.getUpdatedBy(), updateAdmissionPatternDTO.getId()];
        return AppDataSource.manager.query(query, values);
    }

    updateIsAllocated = async (patternId: number): Promise<any> => {
        const query = `
        UPDATE admission_pattern_tbl
        SET isAllocated = true
        WHERE id = ?
    `;
        return AppDataSource.manager.query(query, [patternId]);
    };

    getMaxAssignedSequence = async (generateAdmissionPatternDTO: AutoGenerateAdmissionDTO): Promise<any> => {
        const query = `
      SELECT MAX(CAST(SUBSTRING_INDEX(admissionNumber,'-',-1) AS UNSIGNED)) AS maxSeq
      FROM student_tbl
      WHERE admission_pattern_id = ? AND isDeleted = 0
    `;
        const result = await AppDataSource.manager.query(query, [generateAdmissionPatternDTO.getPatternId()]);
        return result[0]?.maxSeq || 0;
    };


    getAdmissionPatternById = async (generateAdmissionPatternDTO: AutoGenerateAdmissionDTO): Promise<any> => {
        const query = `
        SELECT id, prefix, middleName, startSequence
        FROM admission_pattern_tbl
        WHERE id = ? AND isDeleted = 0
    `;
        const result = await AppDataSource.manager.query(query, [generateAdmissionPatternDTO.getPatternId()]);
        return result[0];
    };

}