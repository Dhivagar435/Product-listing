export class AddAdminDto {
    private readonly id?: number;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly email: string;
    private hashedPassword?: string;
    private staffCode?: string;
    private readonly phoneNumber: string;
    private readonly photoName?: string;
    private readonly dob: string;
    private readonly gender: string;
    private readonly addres1: string;
    private readonly address2?: string;
    private readonly state: string;
    private readonly pinCode: string;
    private readonly userName: string;
    private readonly createdBy: string;


    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        dob: string,
        gender: string,
        address1: string,
        state: string,
        pinCode: string,
        createdBy: string,
        photoName?: string,
        address2?: string,

    ) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.email = email,
            this.phoneNumber = phoneNumber,
            this.photoName = photoName,
            this.dob = dob,
            this.gender = gender,
            this.addres1 = address1,
            this.address2 = address2,
            this.state = state,
            this.pinCode = pinCode,
            this.userName = email.split('@')[0];
        this.createdBy = createdBy
    }

    setHashedPassword(password: string): void {
        this.hashedPassword = password;
    }

    setStaffCode(code: string): void {
        this.staffCode = code;
    }


    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPhoneNumber(): string {
        return this.phoneNumber
    }

    getPhotoName(): string | undefined {
        return this.photoName;
    }

    getDob(): string {
        return this.dob;
    }

    getGender(): string {
        return this.gender;
    }

    getCreatedBy(): string {
        return this.createdBy;
    }

    getAddress1(): string {
        return this.addres1;
    }

    getAddress2(): string | undefined {
        return this.address2;
    }

    getState(): string {
        return this.state;
    }

    getPinCode(): string {
        return this.pinCode;
    }

    getHashedPassword(): string | undefined {
        return this.hashedPassword;
    }

    getStaffCode(): string | undefined {
        return this.staffCode;
    }

    getUserName(): string {
        return this.userName;
    }

    getId(): number | undefined {
        return this.id;
    }
}