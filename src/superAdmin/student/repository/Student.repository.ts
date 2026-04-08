import { injectable } from "tsyringe";
import { AppDataSource } from "../../../config/data-source";
import { StudentAddDTO } from "../controller/StudentAddDTO";
import { Student } from "../entity/Student.entity";
import { StaffDuplicateCheck } from "../../staff/types/Staff.types";
import { StudentDetail } from "../entity/StudentDetails.entity";


@injectable()
export class StudentRepository {

    addStudent = async (student: StudentAddDTO, idempotencyKey: string): Promise<any> => {

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const studentEntity = queryRunner.manager.create(Student, {
                password: student.getHashedPassword(),
                admissionNumber: student.getAdmissionNumber(),
                rollNumber: student.getRollNumber(),
                idempotency: idempotencyKey,

                standard: { id: Number(student.getStandardId()) },
                section: { id: Number(student.getSectionId()) },

                Users: {
                    firstName: student.getFirstName(),
                    lastName: student.getLastName(),
                    email: student.getEmail(),
                    phoneNumber: student.getPhoneNumber(),
                    gender: student.getGender(),
                    userName: student.getUserName(),
                    dob: student.getDob(),
                    photoName: student.getPhotoName(),
                },

                Cruds: {
                    createdBy: student.getCreatedBy()
                }
            });

            const savedStudent = await queryRunner.manager.save(studentEntity);

            const studentDetailEntity = queryRunner.manager.create(StudentDetail, {
                whatsappNumber: student.getWhatsappNumber(),
                typeofParental: student.getTypeofParental(),

                houseNo: student.getHouseNo(),
                street: student.getStreet(),
                area: student.getArea(),
                city: student.getCity(),
                state: student.getState(),
                pinCode: student.getPinCode(),

                motherName: student.getMotherName(),
                motherOccupation: student.getMotherOccupation(),
                fatherName: student.getFatherName(),
                fatherOccupation: student.getFatherOccupation(),
                guardianName: student.getGuardianName(),
                guardianOccupation: student.getGuardianOccupation(),

                student: savedStudent,

                Cruds: {
                    createdBy: student.getCreatedBy()
                }
            });

            await queryRunner.manager.save(studentDetailEntity);

            await queryRunner.commitTransaction();

            return { data: savedStudent.Users.firstName };

        } catch (error) {

            console.log(error, "addStudentRepoError");

            await queryRunner.rollbackTransaction();
            throw error;

        } finally {
            await queryRunner.release();
        }
    };


    checkDuplicate = async (
        id: number | undefined,
        email: string,
        phoneNumber: string
    ): Promise<StaffDuplicateCheck[]> => {

        const result = await AppDataSource.manager.query(
            `SELECT email, phoneNumber 
     FROM staff_tbl 
     WHERE email = ? OR phoneNumber = ?`,
            [id, email, phoneNumber]
        );

        return result;
    };

    getAllStudent = async (page?: number, limit?: number): Promise<any> => {

        let dataQuery = `
        SELECT 
            s.id,
            s.firstName,
            s.lastName,
            s.email,
            s.phoneNumber,
            s.whatsappNumber,
            s.gender,
            s.dob,
            s.admissionNumber,
            s.rollNumber,

            s.houseNo,
            s.street,
            s.area,
            s.city,
            s.state,
            s.pinCode,

            s.motherName,
            s.motherOccupation,
            s.fatherName,
            s.fatherOccupation,
            s.guardianName,
            s.guardianOccupation,

            s.photoName,
            s.photoPath,

            std.id as standardId,
            std.name as standardName,

            sec.id as sectionId,
            sec.name as sectionName

        FROM student_tbl s

        LEFT JOIN standard_tbl std 
            ON s.standard_id = std.id

        LEFT JOIN section_tbl sec 
            ON s.section_id = sec.id

        WHERE s.isDeleted = 0
    `;

        let countQuery = `
        SELECT COUNT(*) as total
        FROM student_tbl
        WHERE isDeleted = 0
    `;

        const params: any[] = [];

        const paginate =
            typeof page === "number" &&
            typeof limit === "number";

        if (paginate) {
            const offset = (page - 1) * limit;
            dataQuery += ` LIMIT ? OFFSET ?`;
            params.push(limit, offset);
        }

        const dataResult = await AppDataSource.manager.query(
            dataQuery,
            params
        );

        if (!paginate) {
            return dataResult;
        }

        const countResult = await AppDataSource.manager.query(countQuery);

        return {
            data: dataResult,
            total: countResult[0].total,
            page,
            limit,
        };
    };


    // updateStaff = async (updateStaffDTO: UpdateStaffDTO): Promise<any> => {

    //     const queryRunner = AppDataSource.createQueryRunner();
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();

    //     try {

    //         await queryRunner.manager.query(
    //             `
    //         UPDATE staff_tbl
    //         SET 
    //             firstName = ?,
    //             lastName = ?,
    //             email = ?,
    //             phoneNumber = ?,
    //             gender = ?,
    //             role_id = ?,
    //             updatedBy = ?
    //         WHERE id = ?
    //         `,
    //             [
    //                 updateStaffDTO.getFirstName(),
    //                 updateStaffDTO.getLastName(),
    //                 updateStaffDTO.getEmail(),
    //                 updateStaffDTO.getPhoneNumber(),
    //                 updateStaffDTO.getGender(),
    //                 updateStaffDTO.getRoleId(),
    //                 updateStaffDTO.getUpdatedBy(),
    //                 updateStaffDTO.getId()
    //             ]
    //         );

    //         await queryRunner.manager.query(
    //             `
    //         UPDATE staff_details_tbl
    //         SET
    //             dob = ?,
    //             qualification = ?,
    //             houseNo = ?,
    //             street = ?,
    //             area = ?,
    //             city = ?,
    //             state = ?,
    //             pinCode = ?,
    //              photoName = COALESCE(?, photoName),
    //             updatedBy = ?
    //         WHERE staff_id = ?
    //         `,
    //             [
    //                 updateStaffDTO.getDob(),
    //                 updateStaffDTO.getQualification(),
    //                 updateStaffDTO.getHouseNo(),
    //                 updateStaffDTO.getStreet(),
    //                 updateStaffDTO.getArea(),
    //                 updateStaffDTO.getCity(),
    //                 updateStaffDTO.getState(),
    //                 updateStaffDTO.getPinCode(),
    //                 updateStaffDTO.getPhotoName(),
    //                 updateStaffDTO.getUpdatedBy(),
    //                 updateStaffDTO.getId()
    //             ]
    //         );

    //         const subjectIds = updateStaffDTO.getSubjectIds();

    //         //  if request contains subjectIds
    //         if (subjectIds !== undefined) {

    //             // ALWAYS DELETE old subjects
    //             await queryRunner.manager.query(
    //                 `DELETE FROM staff_subject_tbl WHERE staff_id = ?`,
    //                 [updateStaffDTO.getId()]
    //             );

    //             // INSERT only if new subjects exist
    //             if (subjectIds.length > 0) {
    //                 for (const subjectId of subjectIds) {
    //                     await queryRunner.manager.query(
    //                         `INSERT INTO staff_subject_tbl (staff_id, subject_id) VALUES (?, ?)`,
    //                         [updateStaffDTO.getId(), subjectId]
    //                     );
    //                 }
    //             }
    //         }

    //         await queryRunner.commitTransaction();

    //     } catch (error) {
    //         console.log(error, "repo_staff_error")
    //         await queryRunner.rollbackTransaction();
    //         throw error;

    //     } finally {

    //         await queryRunner.release();

    //     }
    // };

}

