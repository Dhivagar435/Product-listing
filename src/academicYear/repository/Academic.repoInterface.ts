import { AddAcademicYearDTO } from "../controller/AddAcademicYearDTO";
import { UpdateAcademicYearDTO } from "../controller/UpdateAcademicYearDTO";
import { AddAcademicYearResult, GetAcademicYearResult, updateAcademicYearResult } from "../types/Academic.types";


export interface AcademicYearRepoMethods {
    addAcademicYear(addAcademicYearDto: AddAcademicYearDTO, idempotencyKey: string): Promise<AddAcademicYearResult>
    getAcademicYear(page: number, limit: number, getAll: boolean): Promise<GetAcademicYearResult>;
    updateAcademicYear(updateAcademicYearDTO: UpdateAcademicYearDTO): Promise<updateAcademicYearResult>;
     activateAcademicYear(id:number):Promise<any>;
     deactivateAllAcademicYears():Promise<any>
}
