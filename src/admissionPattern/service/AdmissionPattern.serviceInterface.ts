import { AddAdmissionDtO } from "../controller/AddAdmissionPatternDTO";
import { AutoGenerateAdmissionDTO } from "../controller/GenerateAdmissionPatternDTO";
import { UpdateAdmissionDtO } from "../controller/UpdateAdmissionPatternDTO";

export interface AdmissionPatternServiceMethods {
    addAdmissionPattern(admissionDTO: AddAdmissionDtO, idempotencyKey: string): Promise<void>
    updateAdmissionPattern(updateAdmissionPatternDTO: UpdateAdmissionDtO): Promise<void>
    getAdmissionPattern(page: number, limit: number, getAll: boolean): Promise<void>;
    generateAutoAdmissionNumber(generateAdmissionPatternDTO:AutoGenerateAdmissionDTO):Promise<string>
}
