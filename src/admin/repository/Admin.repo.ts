import { injectable } from "tsyringe";
import { AddAdminDto } from "../controller/AddAdminDTO";
import { AppDataSource } from "../../config/data-source";
import { Admin } from "../entity/Admin.entity";
import { AdminDuplicateCheck } from "../types/Admin.types";



@injectable()
export class AdminRepository {

    addAdmin = async (admindTO: AddAdminDto, idempotencyKey: string): Promise<any> => {

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {


            const adminDetails = queryRunner.manager.create(Admin, {
                // staffCode: admindTO.getStaffCode(),
                password: admindTO.getHashedPassword(),
                idempotency: idempotencyKey,


                Users: {
                    firstName: admindTO.getFirstName(),
                    lastName: admindTO.getLastName(),
                    email: admindTO.getEmail(),
                    phoneNumber: admindTO.getPhoneNumber(),
                    gender: admindTO.getGender(),
                    userName: admindTO.getUserName(),
                    dob: admindTO.getDob(),
                    photoName: admindTO.getPhotoName(),

                },

                address1: admindTO.getAddress1(),
                address2: admindTO.getAddress2(),
                state: admindTO.getState(),
                pinCode: admindTO.getPinCode(),

                Cruds: {
                    createdBy: admindTO.getCreatedBy()
                }
            });

            const savedStaff = await queryRunner.manager.save(adminDetails);

            await queryRunner.commitTransaction();

            return { data: savedStaff.Users.firstName };

        } catch (error) {

            console.log(error, "adminreposerrror");

            await queryRunner.rollbackTransaction();
            throw error;

        } finally {

            await queryRunner.release();
        }
    };

    getLastStaffId = async (): Promise<number | null> => {
        const result = await AppDataSource.manager.query(
            `SELECT id FROM admin_tbl ORDER BY id DESC LIMIT 1`
        );

        return result.length > 0 ? result[0].id : null;
    };

    checkDuplicate = async (
        id: number | undefined,
        email: string,
        phoneNumber: string
    ): Promise<AdminDuplicateCheck[]> => {

        const result = await AppDataSource.manager.query(
            `SELECT email, phoneNumber 
     FROM admin_tbl 
     WHERE email = ? OR phoneNumber = ?`,
            [id, email, phoneNumber]
        );

        return result;
    };

    // findByUsername = async (userName: string): Promise<any> => {
    //     //   console.log('Searching for userName:', userName) 
    //     const query = `
    //     SELECT 
    //         id,
    //         staffCode,
    //         password,
    //         role_id as role,

    //         firstName,
    //         lastName,
    //         email,
    //         phoneNumber,
    //         gender,
    //         userName

    //     FROM staff_tbl
    //     WHERE LOWER(userName) = LOWER(?)
    //     AND isDeleted = 0
    //     LIMIT 1
    // `;

    //     const result = await AppDataSource.manager.query(query, [userName]);


    //     return result.length > 0 ? result[0] : null;
    // };



getAllAdmin = async (
    page: number = 1,
    limit: number = 10,
    getAll: boolean = false
): Promise<{ data: Admin[]; total: number }> => {
    try {

        const query = AppDataSource
            .getRepository(Admin)
            .createQueryBuilder("s")
            .select([
                "s.id",
                "s.firstName",
                "s.lastName",
                "s.email",
                "s.phoneNumber",
                "s.gender",
                "s.userName",
                "s.dob",
                "s.photoName",
                "s.address1",
                "s.address2",
                "s.state",
                "s.pinCode"
            ])
            .where("s.isDeleted = :isDeleted", { isDeleted: 0 })
            .orderBy("s.id", "DESC");

        // Pagination
        if (!getAll) {
            query.skip((page - 1) * limit).take(limit);
        }

        const [data, total] = await query.getManyAndCount();

        return { data, total };

    } catch (error) {
        console.error("getAllAdmin repo error:", error);
        throw error;
    }
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
