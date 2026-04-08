

import { StudentAddDTO } from "../controller/StudentAddDTO";
import { AddStudentResult, GetStudentResult } from "../types/student.types";


export interface StaffStudentInterface {
    addStaff(studentDTO: StudentAddDTO ,idempotencyKey:string): Promise<AddStudentResult>;
    getStudent(page: number, limit: number): Promise<GetStudentResult>;
//     updateStaff(
//    updateStaffDTO:UpdateStaffDTO
//       ): Promise<UpdateStaffResult>;
}