import { StaffDTO } from "../controller/StaffDTO";
import { UpdateStaffDTO } from "../controller/UpdateStaffDTO";

export interface StaffInfo {
    staffCode?: string;
    email: string;
    password?: string;
    firstName: string;
    userName?: string;
    phoneNumber: string;
    role?: string;
    roleId?: string;
    // subject?: string;
    subjectIds: number[];
    lastName: string;
    dob: string;
    qualification: string;
    gender: string;
    photoName?: string;
    photoPath?: string;
    houseNo?: string;
    street?: string;
    area?: string;
    city?: string;
    state: string;
    pinCode: string;
    createdBy: string;
    updatedBy?: string;
}

export interface StaffDuplicateCheck {
    id?:number|undefined;
    email: string;
    phoneNumber: string;
}

export enum StaffStatus {
    Email_Already_EXIST = "Email_already_exist",
    SUCCESS = "Success",
    PHONE_NUMBER_ALREADY_EXIST = "Phonenumber_already_exist",
    ERROR = "Error",
    STAFF_NOT_EXIST = "Staff_not_exist",
    USER_ALREDAY_EXIST = "User_alreday_exist",
    INVALID_INPUT = "Invalid_input",

}

export type AddStaffResult =
    { status: StaffStatus.Email_Already_EXIST } |
    { status: StaffStatus.PHONE_NUMBER_ALREADY_EXIST } |
    { status: StaffStatus.USER_ALREDAY_EXIST } |
    { status: StaffStatus.SUCCESS; } |
    { status: StaffStatus.ERROR; message: string }


export type UpdateStaffResult =
    { status: StaffStatus.Email_Already_EXIST } |
    { status: StaffStatus.SUCCESS; data: StaffInfo | UpdateStaffDTO } |
    { status: StaffStatus.ERROR; message: string } |
    { status: StaffStatus.INVALID_INPUT }

export type GetStaffResult =
    { status: StaffStatus.STAFF_NOT_EXIST; data: [] } |
    { status: StaffStatus.SUCCESS; data: StaffInfo[] } |
    { status: StaffStatus.ERROR; message: string }
