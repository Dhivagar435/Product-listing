import { injectable } from "tsyringe";
import { StaffRepository } from "../superAdmin/staff/repository/Staff.repo";
import { IStaffCodeGenerator } from "./staffCodeInterface";

@injectable()
export class StaffCodeGenerator implements IStaffCodeGenerator {

    constructor(private staffRepository: StaffRepository) {}

    async generate(): Promise<string> {
        const lastId = await this.staffRepository.getLastStaffId();
        const nextId = lastId ? lastId + 1 : 1;

        return `ST${String(nextId).padStart(4, "0")}`;
    }
}