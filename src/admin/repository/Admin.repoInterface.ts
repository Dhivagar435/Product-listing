import { AddAdminDto } from "../controller/AddAdminDTO";
import { AddAdminResult, AdminDuplicateCheck, AdminInfo, GetAdminResult } from "../types/Admin.types";

export interface AdminRepositoryInterface {
    addAdmin(adminDTO:AddAdminDto, idemPotencyKey:string): Promise<AddAdminResult>
    checkDuplicate(id: number | undefined,email: string,phoneNumber: string ): Promise<AdminDuplicateCheck[]>
    getAllAdmin(page:number,limit:number ,getAll:boolean): Promise<{data:AdminInfo[]; total:number}>
}