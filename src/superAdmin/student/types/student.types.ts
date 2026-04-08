

export interface StudentInfo {
    staffCode?: string;
    email: string;
    password?: string;
    firstName: string;
    phoneNumber: string;
    subjectId:string;
    lastName: string;
    dob: string;
    gender: string;
    fatherName:string;
    fatherOccupation:string;
    motherName:string;
    motherOccupation:string;
    admissionNumber:string;
    photoName?: string;
    houseNo?: string;
    street?: string;
    area?: string;
    city?: string;
    state: string;
    pinCode: string;
    createdBy: string;
    updatedBy?: string;
}

export interface StudentDuplicateCheck {
    id?:number|undefined;
    email: string;
    phoneNumber: string;
}

export enum StudentStatus {
    Email_Already_EXIST = "Email_already_exist",
    SUCCESS = "Success",
    PHONE_NUMBER_ALREADY_EXIST = "Phonenumber_already_exist",
    ERROR = "Error",
    STUDENT_NOT_EXIST = "Studnent_not_exist",
    USER_ALREDAY_EXIST = "User_alreday_exist",
    INVALID_INPUT = "Invalid_input",

}

export type AddStudentResult =
    { status: StudentStatus.Email_Already_EXIST } |
    { status: StudentStatus.PHONE_NUMBER_ALREADY_EXIST } |
    { status: StudentStatus.USER_ALREDAY_EXIST } |
    { status: StudentStatus.SUCCESS; } |
    { status: StudentStatus.ERROR; message: string }


export type UpdateStudentResult =
    { status: StudentStatus.Email_Already_EXIST } |
    // { status: StaffStatus.SUCCESS; data: StaffInfo | UpdateStaffDTO } |
    { status: StudentStatus.ERROR; message: string } |
    { status: StudentStatus.INVALID_INPUT }

export type GetStudentResult =
    { status: StudentStatus.STUDENT_NOT_EXIST; data: [] } |
    { status: StudentStatus.SUCCESS; data: StudentInfo[] } |
    { status: StudentStatus.ERROR; message: string }
