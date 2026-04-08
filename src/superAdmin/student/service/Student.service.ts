import { inject, injectable } from "tsyringe";
import { EmailTemplate } from "../../../utils/email/EmailTemplate";
import { EmailService } from "../../../utils/email/SendEmail";
import { AppError } from "../../../constant/error/App.error";
import { CommonRepository } from "../../../common/repo/common.repo";
import { Any } from "typeorm";
import { StudentAddDTO } from "../controller/StudentAddDTO";
import { GetStudentResult, StudentStatus } from "../types/student.types";
import { StudentRepository } from "../repository/Student.repository";
import { AdmissionPatternRepository } from "../../../admissionPattern/repository/AdmissionPattern.repo";


@injectable()
export class StudentService {
    constructor(
        @inject("StudentRepository") private StudentRepository: StudentRepository,


        @inject("EmailService")
        private mailService: EmailService,

        // @inject("StaffCodeGenerator")
        // private staffCodeGenerator: IStaffCodeGenerator,

        @inject("CommonRepository")
        private commonRepository: CommonRepository,

        @inject("admissionPatternRepository") private admissionPatternRepository: AdmissionPatternRepository
    ) { }

    addStudent = async (studentDTO: StudentAddDTO, idempotencyKey: string) => {

        try {

            const existingKey = await this.commonRepository.findByIdempotency(
                "student_tbl",
                idempotencyKey);

            if (existingKey) {
                const { password, ...safeData } = existingKey;
                return { data: safeData };
            }
            console.log("checking idempoetency key ")
            const existing = await this.StudentRepository.checkDuplicate(
                studentDTO.getId(),
                studentDTO.getEmail(),
                studentDTO.getPhoneNumber(),

            );

            if (existing.length > 0) {
                const emailExists = existing.some(
                    user => user.email === studentDTO.getEmail()
                );

                const phoneExists = existing.some(
                    user => user.phoneNumber === studentDTO.getPhoneNumber()
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
       
            // const staffCode = await this.staffCodeGenerator.generate();

       
            // staffDTO.setStaffCode(staffCode);

            const savedStudent = await this.StudentRepository.addStudent(studentDTO, idempotencyKey);

            const patternId = studentDTO.getAdmissionPatternId();
            if (patternId) {
                await this.admissionPatternRepository.updateIsAllocated(patternId);
            }

            console.log(savedStudent, "staffservice")
            const html = EmailTemplate({
                username: studentDTO.getUserName(),
                firstName: studentDTO.getFirstName(),
                portalUrl: process.env.PORTAL_URL!,
                userType: "Student",
                welcomeMessage: "Welcome to the Portal",
            });


            await this.mailService.sendEmail({
                to: studentDTO.getEmail(),
                subject: "Your Student Portal Login Credentials",
                message: html
            });
            return savedStudent;
        }
        catch (error) {
            console.log(error, "servicestudenterror")
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to add Student", 500, error);
        }

    }

    getStudent = async (page: number, limit: number): Promise<GetStudentResult> => {
        try {

            const result = await this.StudentRepository.getAllStudent(page, limit);
            const rows = result.data;

            if (!rows || rows.length === 0) {
                return { status: StudentStatus.STUDENT_NOT_EXIST, data: [] };
            }

            const formattedData = rows.map((row: any) => ({
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email,
                phoneNumber: row.phoneNumber,
                whatsappNumber: row.whatsappNumber,
                gender: row.gender,
                dob: row.dob,
                admissionNumber: row.admissionNumber,
                rollNumber: row.rollNumber,

                houseNo: row.houseNo,
                street: row.street,
                area: row.area,
                city: row.city,
                state: row.state,
                pinCode: row.pinCode,

                motherName: row.motherName,
                motherOccupation: row.motherOccupation,
                fatherName: row.fatherName,
                fatherOccupation: row.fatherOccupation,
                guardianName: row.guardianName,
                guardianOccupation: row.guardianOccupation,

                photoName: row.photoName,
                photoPath: row.photoPath,

                standard: {
                    id: row.standardId,
                    name: row.standardName
                },

                section: {
                    id: row.sectionId,
                    name: row.sectionName
                }
            }));

            return {
                status: StudentStatus.SUCCESS,
                data: formattedData,
                // total: result.total,
                // page: result.page,
                // limit: result.limit
            };

        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("Failed to get Student", 500, err);
        }
    };


    // updateStudent = async (updateStaffDTO: UpdateStaffDTO): Promise<UpdateStaffResult> => {

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



