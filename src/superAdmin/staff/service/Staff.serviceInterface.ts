import { StaffDTO } from "../controller/StaffDTO";
import { UpdateStaffDTO } from "../controller/UpdateStaffDTO";
import { AddStaffResult, GetStaffResult, UpdateStaffResult } from "../types/Staff.types";


export interface StaffServiceInterface {
    addStaff(staffDTO: StaffDTO ,idempotencyKey:string): Promise<AddStaffResult>;
    getStaff(page: number, limit: number): Promise<GetStaffResult>;
    updateStaff(
   updateStaffDTO:UpdateStaffDTO
      ): Promise<UpdateStaffResult>;
}