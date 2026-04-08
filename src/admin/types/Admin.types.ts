import { Admin } from "../entity/Admin.entity";


export interface AdminInfo {
    id?: number,
    email: string;
    firstName: string;
    userName?: string;
    phoneNumber: string;
    lastName: string;
    dob: string;
    gender: string;
    photoName?: string;
    photoPath?: string;
    address1?: string;
    address2?: string;
    state: string;
    pinCode: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface AdminDuplicateCheck {
    id?: number;
    email: string;
    phoneNumber: string;
}


export enum AdminStatus {
    Email_Already_EXIST = "Email_already_exist",
    SUCCESS = "Success",
    PHONE_NUMBER_ALREADY_EXIST = "Phonenumber_already_exist",
    ERROR = "Error",
    ADMIN_NOT_EXIST = "Admin_not_exist",
    USER_ALREDAY_EXIST = "User_already_exist",
    INVALID_INPUT = "Invalid_input",
}

export type AddAdminResult =
    { status: AdminStatus.Email_Already_EXIST } |
    { status: AdminStatus.PHONE_NUMBER_ALREADY_EXIST } |
    { status: AdminStatus.USER_ALREDAY_EXIST } |
    { status: AdminStatus.SUCCESS; } |
    { status: AdminStatus.ERROR; message: string }


export type UpdateAdminResult =
    { status: AdminStatus.Email_Already_EXIST } |
    // { status: AdminStatus.SUCCESS; data: StaffInfo | UpdateStaffDTO } |
    { status: AdminStatus.ERROR; message: string } |
    { status: AdminStatus.INVALID_INPUT }

export type GetAdminResult =
    | { status: AdminStatus.ADMIN_NOT_EXIST; data: [] }
    | { status: AdminStatus.SUCCESS; data: AdminInfo[]; total?: number; page?: number; limit?: number }
    | { status: AdminStatus.ERROR; data: []; message: string };
