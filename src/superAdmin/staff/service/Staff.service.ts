import { inject, injectable } from "tsyringe";
import { AppDataSource } from "../../../config/data-source";
import { StaffDTO } from "../controller/StaffDTO";
import { StaffRepository } from "../repository/Staff.repo";
import { AddStaffResult, GetStaffResult, StaffStatus, UpdateStaffResult } from "../types/Staff.types";
import { EmailTemplate } from "../../../utils/email/EmailTemplate";
import { EmailService } from "../../../utils/email/SendEmail";
import { IStaffCodeGenerator } from "../../../staffCodeGenerator/staffCodeInterface";
import { AppError } from "../../../constant/error/App.error";
import { UserNotFoundExpection } from "../../../constant/UserNameNotFoundExpection";
import { CommonRepository } from "../../../common/repo/common.repo";
import { UpdateStaffDTO } from "../controller/UpdateStaffDTO";
import { Any } from "typeorm";

@injectable()
export class AddStaffService {
    constructor(
        @inject("StaffRepository") private StaffRepository: StaffRepository,

        @inject("EmailService")
        private mailService: EmailService,

        @inject("StaffCodeGenerator")
        private staffCodeGenerator: IStaffCodeGenerator,

        @inject("CommonRepository")
        private commonRepository: CommonRepository,
    ) { }

    addStaff = async (staffDTO: StaffDTO, idempotencyKey: string) => {

        try {

            const existingKey = await this.commonRepository.findByIdempotency(
                "staff_tbl",
                idempotencyKey);

            if (existingKey) {
                const { password, ...safeData } = existingKey;
                return { data: safeData };
            }


            console.log("checking idempoetency key ")
            
            const existing = await this.StaffRepository.checkDuplicate(
                staffDTO.getId(),
                staffDTO.getEmail(),
                staffDTO.getPhoneNumber(),

            );

            if (existing.length > 0) {
                const emailExists = existing.some(
                    user => user.email === staffDTO.getEmail()
                );

                const phoneExists = existing.some(
                    user => user.phoneNumber === staffDTO.getPhoneNumber()
                );


                if (emailExists && phoneExists) {
                    throw new AppError("User already exist", 400);
                }

                if (emailExists) {
                    throw new AppError("Email already exists", 400);
                    // throw new UserNotFoundExpection("user not found", "email already exist")
                }

                if (phoneExists) {
                    throw new AppError("Phone number already exists", 400);
                }
            }
          
            const staffCode = await this.staffCodeGenerator.generate();;

          
            staffDTO.setStaffCode(staffCode);

            const savedStaff = await this.StaffRepository.addStaff(staffDTO, idempotencyKey);

            console.log(savedStaff, "staffservice")
            const html = EmailTemplate({
                username: staffDTO.getUserName(),
                firstName: staffDTO.getFirstName(),
                portalUrl: process.env.PORTAL_URL!,
                userType: "Staff",
                welcomeMessage: "Welcome to the Portal",
            });


            await this.mailService.sendEmail({
                to: staffDTO.getEmail(),
                subject: "Your Staff Portal Login Credentials",
                message: html
            });
            return savedStaff;
        }
        catch (error) {
            console.log(error, "servicestafferror")
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to add Staff", 500, error);
        }

    }

    getStaff = async (page: number, limit: number): Promise<GetStaffResult> => {
        try {

            const result = await this.StaffRepository.getAllStaff(page, limit);
            const rows = result.data;
            
            if (!rows || rows.length === 0) {
                return { status: StaffStatus.STAFF_NOT_EXIST, data: [] };
            }

            const staffMap = new Map();

            rows.forEach((row: any) => {
                if (!staffMap.has(row.id)) {
                    staffMap.set(row.id, {
                        id: row.id,
                        staffCode: row.staffCode,
                        firstName: row.firstName,
                        userName:row.userName,
                        lastName: row.lastName,
                        email: row.email,
                        phoneNumber: row.phoneNumber,
                        gender: row.gender,
                        roleId: row.role_id,
                        roleName: row.roleName,
                        dob: row.dob,
                        qualification: row.qualification,
                        photoName: row.photoName,
                        houseNo: row.houseNo,
                        street: row.street,
                        area: row.area,
                        city: row.city,
                        state: row.state,
                        pinCode: row.pinCode,
                        subjectIds: [],
                        subjects: [],
                        modules: [],


                    });
                }

                const staff = staffMap.get(row.id);

                let module = staff.modules.find(
                    (m: any) => m.moduleId === row.moduleId
                );

                if (!module) {
                    module = {
                        moduleId: row.moduleId,
                        moduleName: row.moduleName,
                        accesses: []
                    };
                    staff.modules.push(module);
                }

                module.accesses.push({
                    accessId: row.accessId,
                    accessName: row.accessName
                });

                if (row.subjectId && !staff.subjectIds.includes(row.subjectId)) {
                    staff.subjectIds.push(row.subjectId);
                }

                if (row.subjectName && !staff.subjects.includes(row.subjectName)) {
                    staff.subjects.push(row.subjectName);
                }
            });

            const formattedData = Array.from(staffMap.values());
          

            const response: GetStaffResult = {
                status: StaffStatus.SUCCESS,
                data: formattedData,
            };

            return response;

        } catch (err) {
            console.log(err,"staffserviceerro")
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to get Staff", 500, err);
        }
    };


    updateStaff = async (updateStaffDTO: UpdateStaffDTO): Promise<UpdateStaffResult> => {

        try {

            const existingStaff = await this.commonRepository.findActiveRecord(
                "staff_tbl",
                "id",
                { id: updateStaffDTO.getId() }
            );

            if (!existingStaff) {
                return { status: StaffStatus.STAFF_NOT_EXIST } as any;
            }

            const duplicateEmail = await this.StaffRepository.checkDuplicate(
                updateStaffDTO.getId(),
                updateStaffDTO.getEmail(),
                updateStaffDTO.getPhoneNumber(),


            );

            if (duplicateEmail.length > 0 && duplicateEmail[0].email !== existingStaff.email) {
                return { status: StaffStatus.Email_Already_EXIST };
            }

            await this.StaffRepository.updateStaff(updateStaffDTO);

            return {
                status: StaffStatus.SUCCESS,
                data: updateStaffDTO
            };

        } catch (err) {
            console.log(err, "update_staff_service")
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to update Staff", 500, err);

        }
    };


}



