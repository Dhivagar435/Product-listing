import { injectable } from "tsyringe";
import { AppDataSource } from "../../config/data-source";
import { AddAcademicYearDTO } from "../controller/AddAcademicYearDTO";
import { UpdateAcademicYearDTO } from "../controller/UpdateAcademicYearDTO";



@injectable()
export class AcademicYearRepository {

    addAcademicYear = async (addAcademicYearDto: AddAcademicYearDTO, idempotencyKey: string): Promise<any> => {
        return AppDataSource.manager.query(
            `INSERT into academic_year_tbl(academicYear,startDate,endDate,createdBy,idempotency) VALUES(?,?,?,?,?)`, [addAcademicYearDto.getAcademicYear(), addAcademicYearDto.getStartDate(), addAcademicYearDto.getEndDate(), addAcademicYearDto.getCreatedBy(), idempotencyKey]
        )
    }

    getAcademicYear = async (
        page?: number,
        limit?: number
    ): Promise<any> => {

        let dataQuery = `
        SELECT 
          id,
          academicYear,
          startDate,
          endDate,
          isActive
        
        FROM academic_year_tbl
        WHERE isDeleted = 0
        ORDER BY updatedAt DESC 
      `;

        let countQuery = `
        SELECT COUNT(*) as total
        FROM academic_year_tbl
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

    updateAdmissionPattern = async (updateAcademicYearDTO: UpdateAcademicYearDTO): Promise<any> => {
        const query = `UPDATE academic_year_tbl
               SET academicYear = ?, startDate = ? , endDate = ?, updatedBy = ? 
               WHERE id = ? `;
        const values = [updateAcademicYearDTO.getAcademicYear(), updateAcademicYearDTO.getStartDate(), updateAcademicYearDTO.getEndDate(), updateAcademicYearDTO.getUpdatedBy(), updateAcademicYearDTO.getId()];
        return AppDataSource.manager.query(query, values);
    };


    deactivateAllAcademicYears = async (): Promise<any> => {
        const query = `UPDATE academic_year_tbl SET isActive = false WHERE isDeleted = 0`;
        return AppDataSource.manager.query(query);
    };

    activateAcademicYear = async (id: number): Promise<any> => {
        const query = `UPDATE academic_year_tbl SET isActive = true WHERE id = ?`;
        return AppDataSource.manager.query(query, [id]);
    };



}