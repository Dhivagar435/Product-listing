import { AppError } from "../../../constant/error/App.error";

export class UpdateStaffDTO {
    private readonly id: number;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly email: string;
    private readonly roleId: string;
    private readonly dob: string;
    private readonly phoneNumber: string;
    private readonly subjectIds?: number[];
    private readonly qualification: string;
    private readonly gender: string;
    private readonly photoName?: string;
    private readonly houseNo: string;
    private readonly street: string;
    private readonly city: string;
    private readonly area: string;
    private readonly state: string;
    private readonly pinCode: string;
    // private readonly userName: string;
    private readonly updatedBy: string;


    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        roleId: string,
        dob: string,
        phoneNumber: string,
        qualification: string,
        gender: string,
        houseNo: string,
        street: string,
        city: string,
        area: string,
        state: string,
        pinCode: string,
        // userName: string,
        updatedBy: string,
        photoName?: string,
        subjectIds?: number[] | string[],
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = this.validateEmail(email);
        this.roleId = roleId;
        this.dob = dob;
        this.phoneNumber = this.validatePhone(phoneNumber);
        this.subjectIds = this.subjectIds;
        this.qualification = qualification;
        this.gender = gender;
        this.photoName = photoName;
        this.houseNo = houseNo;
        this.street = street;
        this.city = city;
        this.area = area;
        this.state = state;
        this.pinCode = pinCode;
        // this.userName = userName;
        this.updatedBy = updatedBy;
    }

    getId(): number { return this.id }
    getFirstName(): string { return this.firstName; }
    getLastName(): string { return this.lastName; }
    getEmail(): string { return this.email; }
    getRoleId(): string { return this.roleId; }
    getDob(): string { return this.dob; }
    getPhoneNumber(): string { return this.phoneNumber; }
    getSubjectIds(): number[] | undefined { return this.subjectIds; }
    getQualification(): string { return this.qualification; }
    getGender(): string { return this.gender; }
    getPhotoName(): string | undefined { return this.photoName; }
    getHouseNo(): string { return this.houseNo; }
    getStreet(): string { return this.street; }
    getCity(): string { return this.city; }
    getArea(): string { return this.area; }
    getState(): string { return this.state; }
    getPinCode(): string { return this.pinCode; }
    // getUserName(): string { return this.userName; }
    getUpdatedBy(): string { return this.updatedBy; }

    // private formatSubjectIds(subjectIds?: any): number[] {
    //     if (!subjectIds) return [];

    //     if (!Array.isArray(subjectIds)) {
    //         subjectIds = [subjectIds];
    //     }

    //     return subjectIds.map((id: any) => Number(id));
    // }

    private validateEmail(email: string): string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new AppError("Invalid email format",400);
        }

        return email;
    }

    private validatePhone(phone: string): string {
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(phone)) {
             throw new AppError("Invalid phone number", 400);
        }

        return phone;
    }

}