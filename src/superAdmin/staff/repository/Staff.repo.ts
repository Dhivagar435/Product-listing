import { injectable } from "tsyringe";
import { StaffDTO } from "../controller/StaffDTO";
import { AppDataSource } from "../../../config/data-source";
import { StaffDuplicateCheck, StaffInfo } from "../types/Staff.types";
import { UpdateStaffDTO } from "../controller/UpdateStaffDTO";
import { Staff } from "../entity/StaffEntity";
import { StaffDetails } from "../entity/StaffDetailsEntity";
import { StaffRepositoryInterface } from "./Staff.repoInterface";


@injectable()
export class StaffRepository {

    addStaff = async (staff: StaffDTO, idempotencyKey: string): Promise<any> => {

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {


            const staffEntity = queryRunner.manager.create(Staff, {
                staffCode: staff.getStaffCode(),
                password: staff.getHashedPassword(),
                idempotency: idempotencyKey,
                role: { id: Number(staff.getRoleId()) },

                Users: {
                    firstName: staff.getFirstName(),
                    lastName: staff.getLastName(),
                    email: staff.getEmail(),
                    gender: staff.getGender(),
                    userName: staff.getUserName(),
                    phoneNumber: staff.getPhoneNumber(),
                     dob: staff.getDob(),
                        photoName: staff.getPhotoName(),
                },

                Cruds: {
                    createdBy: staff.getCreatedBy()
                }
            });

            const savedStaff = await queryRunner.manager.save(staffEntity);


            const staffDetails = queryRunner.manager.create(StaffDetails, {
                qualification: staff.getQualification(),
                houseNo: staff.getHouseNo(),
                street: staff.getStreet(),
                area: staff.getArea(),
                city: staff.getCity(),
                state: staff.getState(),
                pinCode: staff.getPinCode(),
                staff: savedStaff,
                createdBy: staff.getCreatedBy()
            });

            await queryRunner.manager.save(staffDetails);

            await queryRunner.commitTransaction();

            return { data: savedStaff.Users.firstName };

        } catch (error) {

            console.log(error, "addstaffrepoerror");

            await queryRunner.rollbackTransaction();
            throw error;

        } finally {

            await queryRunner.release();
        }
    };

    getLastStaffId = async (): Promise<number | null> => {
        const result = await AppDataSource.manager.query(
            `SELECT id FROM staff_tbl ORDER BY id DESC LIMIT 1`
        );

        return result.length > 0 ? result[0].id : null;
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

    findByUsername = async (userName: string): Promise<any> => {
        //   console.log('Searching for userName:', userName) 
    const query = `
        SELECT 
            id,
            staffCode,
            password,
            role_id as role,

            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            userName

        FROM staff_tbl
        WHERE LOWER(userName) = LOWER(?)
        AND isDeleted = 0
        LIMIT 1
    `;

    const result = await AppDataSource.manager.query(query, [userName]);
   

    return result.length > 0 ? result[0] : null;
};



    getAllStaff = async (page?: number, limit?: number): Promise<any> => {

        let staffIds: number[] = [];

        const paginate =
            typeof page === "number" &&
            typeof limit === "number";

        // STEP 1: Get staff IDs
        if (paginate) {
            const offset = (page - 1) * limit;

            const idQuery = `
            SELECT id
            FROM staff_tbl
            WHERE isDeleted = 0
            ORDER BY id
            LIMIT ? OFFSET ?
        `;

            const idResult = await AppDataSource.manager.query(idQuery, [limit, offset]);
            staffIds = idResult.map((row: any) => row.id);

            if (staffIds.length === 0) {
                return {
                    data: [],
                    total: 0,
                    page,
                    limit
                };
            }
        }

        // STEP 2: Main query
        let dataQuery = `
        SELECT 
            s.id,
            s.staffCode,
            s.firstName,
            s.lastName,
            s.email,
            s.phoneNumber,
            s.gender,
            s.userName,
            s.dob,
            s.photoName as photoName, 
            s.role_id,

            r.name as roleName,

          
            d.qualification,
         
            d.houseNo,
            d.street,
            d.area,
            d.city,
            d.state,
            d.pinCode,

            m.id as moduleId,
            m.name as moduleName,

            a.id as accessId,
            a.name as accessName,

            sub.id as subjectId,
            sub.name as subjectName

        FROM staff_tbl s

        LEFT JOIN staff_details_tbl d ON s.id = d.staff_id
        LEFT JOIN role_module_access_tbl rma ON s.role_id = rma.role_id
        LEFT JOIN frontend_module_tbl m ON rma.module_id = m.id
        LEFT JOIN access_tbl a ON rma.access_id = a.id
        LEFT JOIN staff_subject_tbl ss ON s.id = ss.staff_id
        LEFT JOIN subject_tbl sub ON ss.subject_id = sub.id
        LEFT JOIN role_tbl r ON s.role_id = r.id

        WHERE s.isDeleted = 0
        ${paginate ? `AND s.id IN (${staffIds.map(() => '?').join(',')})` : ''}
    `;

        const queryParams = paginate ? staffIds : [];

        const dataResult = await AppDataSource.manager.query(dataQuery, queryParams);
        if (!paginate) {
            return dataResult;
        }

        // Count query (no change)
        const countQuery = `
        SELECT COUNT(*) as total
        FROM staff_tbl
        WHERE isDeleted = 0
    `;

        const countResult = await AppDataSource.manager.query(countQuery);

        return {
            data: dataResult,
            total: countResult[0].total,
            page,
            limit,
        };
    };


    updateStaff = async (updateStaffDTO: UpdateStaffDTO): Promise<any> => {

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            await queryRunner.manager.query(
                `
            UPDATE staff_tbl
            SET 
                firstName = ?,
                lastName = ?,
                email = ?,
                phoneNumber = ?,
                gender = ?,
                role_id = ?,
                updatedBy = ?
            WHERE id = ?
            `,
                [
                    updateStaffDTO.getFirstName(),
                    updateStaffDTO.getLastName(),
                    updateStaffDTO.getEmail(),
                    updateStaffDTO.getPhoneNumber(),
                    updateStaffDTO.getGender(),
                    updateStaffDTO.getRoleId(),
                    updateStaffDTO.getUpdatedBy(),
                    updateStaffDTO.getId()
                ]
            );

            await queryRunner.manager.query(
                `
            UPDATE staff_details_tbl
            SET
                dob = ?,
                qualification = ?,
                houseNo = ?,
                street = ?,
                area = ?,
                city = ?,
                state = ?,
                pinCode = ?,
                 photoName = COALESCE(?, photoName),
                updatedBy = ?
            WHERE staff_id = ?
            `,
                [
                    updateStaffDTO.getDob(),
                    updateStaffDTO.getQualification(),
                    updateStaffDTO.getHouseNo(),
                    updateStaffDTO.getStreet(),
                    updateStaffDTO.getArea(),
                    updateStaffDTO.getCity(),
                    updateStaffDTO.getState(),
                    updateStaffDTO.getPinCode(),
                    updateStaffDTO.getPhotoName(),
                    updateStaffDTO.getUpdatedBy(),
                    updateStaffDTO.getId()
                ]
            );

            const subjectIds = updateStaffDTO.getSubjectIds();

            //  if request contains subjectIds
            if (subjectIds !== undefined) {

                // ALWAYS DELETE old subjects
                await queryRunner.manager.query(
                    `DELETE FROM staff_subject_tbl WHERE staff_id = ?`,
                    [updateStaffDTO.getId()]
                );

                // INSERT only if new subjects exist
                if (subjectIds.length > 0) {
                    for (const subjectId of subjectIds) {
                        await queryRunner.manager.query(
                            `INSERT INTO staff_subject_tbl (staff_id, subject_id) VALUES (?, ?)`,
                            [updateStaffDTO.getId(), subjectId]
                        );
                    }
                }
            }

            await queryRunner.commitTransaction();

        } catch (error) {
            console.log(error, "repo_staff_error")
            await queryRunner.rollbackTransaction();
            throw error;

        } finally {

            await queryRunner.release();

        }
    };

}


    // getAllStaff = async (page?: number, limit?: number): Promise<any> => {

    //     let dataQuery = `
    //     SELECT 
    //         s.id,
    //         s.staffCode,
    //         s.firstName,
    //         s.lastName,
    //         s.email,
    //         s.phoneNumber,
    //         s.gender,
    //         s.role_id,

    //         r.name as roleName,

    //         d.dob,
    //         d.qualification,
    //         d.photoName as photoName, 
    //         d.houseNo,
    //         d.street,
    //         d.area,
    //         d.city,
    //         d.state,
    //         d.pinCode,

    //         m.id as moduleId,
    //         m.name as moduleName,

    //         a.id as accessId,
    //         a.name as accessName,

    //         sub.id as subjectId,
    //         sub.name as subjectName


    //     FROM staff_tbl s
    //     LEFT JOIN staff_details_tbl d 
    //         ON s.id = d.staff_id

    //     LEFT JOIN role_module_access_tbl rma
    //         ON s.role_id = rma.role_id

    //     LEFT JOIN frontend_module_tbl m
    //         ON rma.module_id = m.id

    //     LEFT JOIN access_tbl a
    //         ON rma.access_id = a.id

    //     LEFT JOIN staff_subject_tbl ss ON s.id = ss.staff_id

    //     LEFT JOIN subject_tbl sub ON ss.subject_id = sub.id

    //     LEFT JOIN role_tbl r 
    //     ON s.role_id = r.id

    //     WHERE s.isDeleted = 0
    // `;
    //     let countQuery = `
    //         SELECT COUNT(*) as total
    //         FROM staff_tbl
    //         WHERE isDeleted = 0
    //     `;

    //     const params: any[] = [];

    //     const paginate =
    //         typeof page === "number" &&
    //         typeof limit === "number";

    //     if (paginate) {
    //         const offset = (page - 1) * limit;
    //         dataQuery += ` LIMIT ? OFFSET ?`;
    //         params.push(limit, offset);
    //     }

    //     const dataResult = await AppDataSource.manager.query(
    //         dataQuery,
    //         params
    //     );
    //     console.log("db result:", dataResult);

    //     if (!paginate) {
    //         return dataResult;
    //     }

    //     const countResult = await AppDataSource.manager.query(countQuery);

    //     return {
    //         data: dataResult,
    //         total: countResult[0].total,
    //         page,
    //         limit,
    //     };
    // }

