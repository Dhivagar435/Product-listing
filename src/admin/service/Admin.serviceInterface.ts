import { AddAdminDto } from "../controller/AddAdminDTO";
import { AddAdminResult, GetAdminResult } from "../types/Admin.types";


export interface AdminServiceInterface {
    addAdmin(adminDTO: AddAdminDto, idempotencyKey: string): Promise<AddAdminResult>;
    getAdmin(page: number, limit: number,getAll:boolean): Promise<GetAdminResult>;
}