import { BoolEnum } from "sharp";

export interface AcademicInfo {
    id?: number,
    academicYear: string,
    startDate: string,
    endDate: string,
    isActive: boolean,
    createdBy?: string,
    updatedBy?: string
}


export enum AcademicYearStatus {
    NAME_ALREADY_EXIST = "Academic_year_already_exist",
    SUCCESS = "success",
    ERROR = "error",
    INVALID_NAME = "Invalid_name",
    NAME_NOT_EXIST = "Academic_year_not_exist",
    NO_NAME_FOUND = "No_academic_year_found",
    INVALID_INPUT = "Invalid_input",
}

export type AddAcademicYearResult =
    | { status: AcademicYearStatus.NAME_ALREADY_EXIST }
    | { status: AcademicYearStatus.SUCCESS; data: AcademicInfo }
    | { status: AcademicYearStatus.ERROR; message: string }
    | { status: AcademicYearStatus.INVALID_NAME }

export type GetAcademicYearResult =
    | { status: AcademicYearStatus.NAME_NOT_EXIST }
    | { status: AcademicYearStatus.NO_NAME_FOUND; data: [] }
    | { status: AcademicYearStatus.SUCCESS; data: AcademicYearStatus[]; }
    | { status: AcademicYearStatus.ERROR; message: string };

export type updateAcademicYearResult =
    | { status: AcademicYearStatus.NAME_NOT_EXIST }
    | { status: AcademicYearStatus.SUCCESS }
    | { status: AcademicYearStatus.INVALID_INPUT }
    | { status: AcademicYearStatus.ERROR; message: string }
    | { status: AcademicYearStatus.NAME_ALREADY_EXIST };

