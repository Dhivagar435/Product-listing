import { AddStaffResult, GetStaffResult, UpdateStaffResult } from "../types/Staff.types";

export interface StaffRepositoryInterface {
    addStaff(): Promise<AddStaffResult>
    // updateStaff(): Promise<UpdateStaffResult>
    // getStaff(): Promise<GetStaffResult>
}