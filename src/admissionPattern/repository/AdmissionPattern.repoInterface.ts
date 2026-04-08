import { AddAdmissionDtO } from "../controller/AddAdmissionPatternDTO";
import { AutoGenerateAdmissionDTO } from "../controller/GenerateAdmissionPatternDTO";
import { UpdateAdmissionDtO } from "../controller/UpdateAdmissionPatternDTO";
import { AddAdmissionPatternResult, GetAdmissionPatternResult, updateAdmissionPatternResult } from "../types/AdmissionPattern.types";

export interface AdmissionPatterRepoMethods {
    addAdmissionPattern(addAdmissionPatternDto: AddAdmissionDtO, idempotencyKey: string): Promise<AddAdmissionPatternResult>
    getAdmissionPattern(page: number, limit: number, getAll: boolean): Promise<GetAdmissionPatternResult>
    updateAdmissionPattern(updateAdmissionPatternDTO: UpdateAdmissionDtO): Promise<updateAdmissionPatternResult>
    getMaxAssignedSequence(generateAdmissionPatternDTO: AutoGenerateAdmissionDTO): Promise<any>
    getAdmissionPatternById(generateAdmissionPatternDTO: AutoGenerateAdmissionDTO):Promise<any>
}
