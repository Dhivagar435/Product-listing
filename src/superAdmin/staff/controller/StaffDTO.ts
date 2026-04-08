export class StaffDTO {

    private readonly id?: number;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly email: string;
    private hashedPassword?: string;
    private staffCode?: string;
    private readonly roleId: string;
    private readonly dob: string;
    private readonly phoneNumber: string;
    private readonly subjectIds: number[];
    private readonly qualification: string;
    private readonly gender: string;
    private readonly photoName?: string;
    private readonly houseNo: string;
    private readonly street: string;
    private readonly city: string;
    private readonly area: string;
    private readonly state: string;
    private readonly pinCode: string;
    private readonly userName: string;
    private readonly createdBy: string;

    constructor(

        firstName: string,
        lastName: string,
        email: string,
        roleId: string,
        dob: string,
        phoneNumber: string,
        subjectIds: number[],
        qualification: string,
        gender: string,
        houseNo: string,
        street: string,
        city: string,
        area: string,
        state: string,
        pinCode: string,
        createdBy: string,
        photoName?: string,
    ) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roleId = roleId;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.subjectIds = subjectIds;
        this.qualification = qualification;
        this.gender = gender;
        this.photoName = photoName;
        this.houseNo = houseNo;
        this.street = street;
        this.city = city;
        this.area = area;
        this.state = state;
        this.pinCode = pinCode;
        this.userName = email.split('@')[0];
        this.createdBy = createdBy;
    }


    setHashedPassword(password: string): void {
        this.hashedPassword = password;
    }

    setStaffCode(code: string): void {
        this.staffCode = code;
    }
    getId(): number | undefined { return this.id }
    getFirstName(): string { return this.firstName; }
    getLastName(): string { return this.lastName; }
    getEmail(): string { return this.email; }
    getRoleId(): string { return this.roleId; }
    getDob(): string { return this.dob; }
    getPhoneNumber(): string { return this.phoneNumber; }
    getSubjectIds(): number[] { return this.subjectIds; }
    getQualification(): string { return this.qualification; }
    getGender(): string { return this.gender; }
    getPhotoName(): string | undefined { return this.photoName }
    getHouseNo(): string { return this.houseNo; }
    getStreet(): string { return this.street; }
    getCity(): string { return this.city; }
    getArea(): string { return this.area; }
    getState(): string { return this.state; }
    getPinCode(): string { return this.pinCode; }
    getUserName(): string { return this.userName; }
    getCreatedBy(): string { return this.createdBy; }
    getHashedPassword(): string | undefined { return this.hashedPassword; }
    getStaffCode(): string | undefined {
        return this.staffCode;
    }
}