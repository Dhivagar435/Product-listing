import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Student } from "../superAdmin/student/entity/Student.entity";
import { Staff } from "../superAdmin/staff/entity/StaffEntity";
import { StaffDetails } from "../superAdmin/staff/entity/StaffDetailsEntity";
import { AdmissionPattern } from "../admissionPattern/entity/AdmissionPatternEntity";
import { AcademicYear } from "../academicYear/entity/AcademicYear.entity";
import { StudentDetail } from "../superAdmin/student/entity/StudentDetails.entity";

dotenv.config({ debug: false });
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Staff, StaffDetails,Student, AdmissionPattern, AcademicYear, StudentDetail],
  extra: {
    connectionLimit: Number(process.env.DB_POOL_LIMIT),
    connectTimeout: Number(process.env.DB_TIMEOUT),
    waitForConnections: true,
    queueLimit: 0,
  },
});
