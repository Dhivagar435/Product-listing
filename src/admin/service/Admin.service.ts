import { inject, injectable } from "tsyringe";
import { AdminRepositoryInterface } from "../repository/Admin.repoInterface";
import { EmailService } from "../../utils/email/SendEmail";
import { IStaffCodeGenerator } from "../../staffCodeGenerator/staffCodeInterface";
import { CommonRepository } from "../../common/repo/common.repo";
import { AppError } from "../../constant/error/App.error";
import { EmailTemplate } from "../../utils/email/EmailTemplate";
import { AddAdminDto } from "../controller/AddAdminDTO";
import { AdminInfo, AdminStatus, GetAdminResult } from "../types/Admin.types";

@injectable()
export class AdminService {
    constructor(
        @inject("adminRepository") private adminRepository: AdminRepositoryInterface,

        @inject("EmailService")
        private mailService: EmailService,

        @inject("StaffCodeGenerator")
        private staffCodeGenerator: IStaffCodeGenerator,

        @inject("CommonRepository")
        private commonRepository: CommonRepository,
    ) { }

    addAdmin = async (adminDTO: AddAdminDto, idempotencyKey: string) => {

        try {

            const existingKey = await this.commonRepository.findByIdempotency(
                "staff_tbl",
                idempotencyKey);

            if (existingKey) {
                const { password, ...safeData } = existingKey;
                return { data: safeData };
            }


            console.log("checking idempoetency key ")

            const existing = await this.adminRepository.checkDuplicate(
                adminDTO.getId(),
                adminDTO.getEmail(),
                adminDTO.getPhoneNumber(),

            );

            if (existing.length > 0) {
                const emailExists = existing.some(
                    user => user.email === adminDTO.getEmail()
                );

                const phoneExists = existing.some(
                    user => user.phoneNumber === adminDTO.getPhoneNumber()
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

    
            adminDTO.setStaffCode(staffCode);

            const savedStaff = await this.adminRepository.addAdmin(adminDTO, idempotencyKey);

            console.log(savedStaff, "staffservice")
            const html = EmailTemplate({
                username: adminDTO.getUserName(),
                firstName: adminDTO.getFirstName(),
             
                portalUrl: process.env.PORTAL_URL!,
                userType: "Staff",
                welcomeMessage: "Welcome to the Portal",
            });


            await this.mailService.sendEmail({
                to: adminDTO.getEmail(),
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

    getAdmin = async (
        page?: number,
        limit?: number,
        getAll: boolean = false
    ): Promise<GetAdminResult> => {
        try {

            const pageNumber = page ?? 1;
            const limitNumber = limit ?? 10;

            const { data, total } = await this.adminRepository.getAllAdmin(
                pageNumber,
                limitNumber,
                getAll
            );

            if (!data || data.length === 0) {
                return {
                    status: AdminStatus.ADMIN_NOT_EXIST,
                    data: []
                };
            }

            return {
                status: AdminStatus.SUCCESS,
                data,
                total,
                page: getAll ? undefined : pageNumber,
                limit: getAll ? undefined : limitNumber
            };

        } catch (err) {
            console.error("adminService error:", err);

            if (err instanceof AppError) throw err;

            throw new AppError("Failed to get Admin", 500, err);
        }
    };


    // updateStaff = async (updateStaffDTO: UpdateStaffDTO): Promise<UpdateStaffResult> => {

    //     try {

    //         const existingStaff = await this.commonRepository.findActiveRecord(
    //             "staff_tbl",
    //             "id",
    //             { id: updateStaffDTO.getId() }
    //         );

    //         if (!existingStaff) {
    //             return { status: StaffStatus.STAFF_NOT_EXIST } as any;
    //         }

    //         const duplicateEmail = await this.StaffRepository.checkDuplicate(
    //             updateStaffDTO.getId(),
    //             updateStaffDTO.getEmail(),
    //             updateStaffDTO.getPhoneNumber(),


    //         );

    //         if (duplicateEmail.length > 0 && duplicateEmail[0].email !== existingStaff.email) {
    //             return { status: StaffStatus.Email_Already_EXIST };
    //         }

    //         await this.StaffRepository.updateStaff(updateStaffDTO);

    //         return {
    //             status: StaffStatus.SUCCESS,
    //             data: updateStaffDTO
    //         };

    //     } catch (err) {
    //         console.log(err, "update_staff_service")
    //         if (err instanceof AppError) throw err;
    //         throw new AppError("Failed to update Staff", 500, err);

    //     }
    // };


}



