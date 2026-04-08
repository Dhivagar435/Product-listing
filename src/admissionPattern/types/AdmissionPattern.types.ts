export interface AdmissionPatternInfo {
    id?: number;
    prefix: String;
    middleName: string;
    startSequence: string;
    createdBy?: string;
    updatedBy?: string
}


export enum AdmissionPatternStatus {
    NAME_ALREADY_EXIST = "Admission_pattern_already_exist",
    SUCCESS = "success",
    ERROR = "error",
    INVALID_NAME = "Invalid_name",
    NAME_NOT_EXIST = "Admission_pattern_not_exist",
    NO_NAME_FOUND = "No_admission_pattern_found",
    INVALID_INPUT = "Invalid_input",
}

export type AddAdmissionPatternResult =
    | { status: AdmissionPatternStatus.NAME_ALREADY_EXIST }
    | { status: AdmissionPatternStatus.SUCCESS; data: AdmissionPatternInfo }
    | { status: AdmissionPatternStatus.ERROR; message: string }
    | { status: AdmissionPatternStatus.INVALID_NAME }

export type GetAdmissionPatternResult =
    | { status: AdmissionPatternStatus.NAME_NOT_EXIST }
    | { status: AdmissionPatternStatus.NO_NAME_FOUND; data: [] }
    | { status: AdmissionPatternStatus.SUCCESS; data: AdmissionPatternStatus[]; }
    | { status: AdmissionPatternStatus.ERROR; message: string };

export type updateAdmissionPatternResult =
    | { status: AdmissionPatternStatus.NAME_NOT_EXIST }
    | { status: AdmissionPatternStatus.SUCCESS }
    | { status: AdmissionPatternStatus.INVALID_INPUT }
    | { status: AdmissionPatternStatus.ERROR; message: string }
    | { status: AdmissionPatternStatus.NAME_ALREADY_EXIST };

