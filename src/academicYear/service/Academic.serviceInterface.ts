import { AddAcademicYearDTO } from "../controller/AddAcademicYearDTO";
import { UpdateAcademicYearDTO } from "../controller/UpdateAcademicYearDTO";


export interface AcademicYearServiceMethods {
    addAcademicYear(academicYearDTO: AddAcademicYearDTO, idempotencyKey: string): Promise<void>;
    updateAcademicYear(updateAcademicYearDTO: UpdateAcademicYearDTO): Promise<void>;
    getAcademicYear(page: number, limit: number, getAll: boolean): Promise<void>;
    activateAcademicYear(id: number): Promise<any>;
}
