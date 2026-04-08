import { container } from "tsyringe";
import { CommonRepository } from "../common/repo/common.repo";
import { AddStaffController } from "../superAdmin/staff/controller/Staff.controller";
import { AddStaffService } from "../superAdmin/staff/service/Staff.service";
import { StaffRepository } from "../superAdmin/staff/repository/Staff.repo";
import { StaffCodeGenerator } from "../staffCodeGenerator/staffCodeGenrator";
import { EmailService } from "../utils/email/SendEmail";
import { GlobalException } from "../constant/GlobalExpection";

import { StudentController } from "../superAdmin/student/controller/Student.controller";
import { StudentService } from "../superAdmin/student/service/Student.service";
import { StudentRepository } from "../superAdmin/student/repository/Student.repository";
import { AdmissionPatternController } from "../admissionPattern/controller/AdmissionPattern.controller";
import { AdmissionPatternService } from "../admissionPattern/service/AdmissionPattern.service";
import { AdmissionPatternRepository } from "../admissionPattern/repository/AdmissionPattern.repo";
import { AcademicYearController } from "../academicYear/controller/AcademicYear.controller";
import { AcademicYearService } from "../academicYear/service/Academic.service";
import { AcademicYearRepository } from "../academicYear/repository/Academic.repo";
import { AdminController } from "../admin/controller/Admin.controller";
import { constants } from "node:buffer";
import { AdminService } from "../admin/service/Admin.service";
import { AdminRepository } from "../admin/repository/Admin.repo";


container.register("CommonRepository", {
  useClass: CommonRepository,
});

//staff
container.register("AddStaffController", {
  useClass: AddStaffController,
});

container.register("StaffService",
  {
    useClass: AddStaffService,
  }
);

container.register("StaffRepository", {
  useClass: StaffRepository,
});

container.register("StaffCodeGenerator", {
  useClass: StaffCodeGenerator,
});

container.register("EmailService", {
  useClass: EmailService,
});

//globalexpection 

container.register("GlobalExpection", {
  useClass: GlobalException
})

container.register("StudentController", {
  useClass: StudentController
})

container.register("StudentService", {
  useClass: StudentService
})

container.register("StudentRepository", {
  useClass: StudentRepository
})


//admissionpattern

container.register("admissionPatternController", {
  useClass: AdmissionPatternController
})

container.register("admissionPatternService", {
  useClass: AdmissionPatternService
})

container.register("admissionPatternRepository", {
  useClass: AdmissionPatternRepository
})


container.register("academicYearController", {
  useClass: AcademicYearController
})

container.register("academicYearService", {
  useClass: AcademicYearService
})

container.register("academicYearRepository", {
  useClass: AcademicYearRepository
})

//admin

container.register("admincontroller", {
  useClass: AdminController
})

container.register("adminService", {
  useClass: AdminService
})

container.register("adminRepository", {
  useClass: AdminRepository
})

