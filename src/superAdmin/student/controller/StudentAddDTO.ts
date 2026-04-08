export class StudentAddDTO {

    private readonly id?: number;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly admissionNumber: string;
    private readonly admissionPatternId: number;
    private readonly email: string;
    private hashedPassword?: string;
    private readonly phoneNumber: string;
    private readonly dob: string;
    private readonly whatsappNumber?: string;
    private readonly standardId: string;
    private readonly sectionId: string;
    private readonly typeofParental: string;
    private readonly photoName?: string;
    private readonly houseNo: string;
    private readonly street: string;
    private readonly area: string;
    private readonly city: string;
    private readonly state: string;
    private readonly pinCode: string;
    private readonly motherName?: string;
    private readonly motherOccupation?: string;
    private readonly fatherName?: string;
    private readonly fatherOccupation?: string;
    private readonly guardianName?: string;
    private readonly guardianOccupation?: string;
    private readonly gender: string;
    private readonly rollNumber: string;
    private readonly userName: string;
    private readonly createdBy: string;


    constructor(
        firstName: string,
        lastName: string,
        admissionNumber: string,
        admissionPatternId: number,
        email: string,
        phoneNumber: string,
        dob: string,
        whatsappNumber: string,
        standardId: string,
        sectionId: string,
        typeofParental: string,
        houseNo: string,
        street: string,
        area: string,
        city: string,
        state: string,
        pinCode: string,
        motherName: string,
        motherOccupation: string,
        fatherName: string,
        fatherOccupation: string,
        guardianName: string,
        guardianOccupation: string,
        gender: string,
        rollNumber: string,
        userName: string,
        createdBy: string,
        photoName?: string,


    ) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.admissionNumber = admissionNumber;
        this.admissionPatternId = admissionPatternId,
            this.email = email;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.whatsappNumber = whatsappNumber;
        this.standardId = standardId;
        this.sectionId = sectionId;
        this.typeofParental = typeofParental;
        this.photoName = photoName;
        this.houseNo = houseNo;
        this.street = street;
        this.area = area;
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
        this.motherName = motherName;
        this.motherOccupation = motherOccupation;
        this.fatherName = fatherName;
        this.fatherOccupation = fatherOccupation;
        this.guardianName = guardianName;
        this.guardianOccupation = guardianOccupation;
        this.gender = gender;
        this.rollNumber = rollNumber;
        this.userName = userName;
        this.createdBy = createdBy;
    }

    setHashedPassword(password: string): void {
        this.hashedPassword = password;
    }

    getId(): number | undefined {
        return this.id
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getAdmissionNumber(): string {
        return this.admissionNumber;
    }

    getAdmissionPatternId(): number {
        return this.admissionPatternId
    }

    getEmail(): string {
        return this.email;
    }

    getHashedPassword(): string | undefined {
        return this.hashedPassword;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getDob(): string {
        return this.dob;
    }

    getWhatsappNumber(): string | undefined {
        return this.whatsappNumber;
    }

    getStandardId(): string {
        return this.standardId;
    }

    getSectionId(): string {
        return this.sectionId;
    }

    getTypeofParental(): string {
        return this.typeofParental;
    }

    getPhotoName(): string | undefined {
        return this.photoName;
    }

    getHouseNo(): string {
        return this.houseNo;
    }

    getStreet(): string {
        return this.street;
    }

    getArea(): string {
        return this.area;
    }

    getCity(): string {
        return this.city;
    }

    getState(): string {
        return this.state;
    }

    getPinCode(): string {
        return this.pinCode;
    }

    getMotherName(): string | undefined {
        return this.motherName;
    }

    getMotherOccupation(): string | undefined {
        return this.motherOccupation;
    }

    getFatherName(): string | undefined {
        return this.fatherName;
    }

    getFatherOccupation(): string | undefined {
        return this.fatherOccupation;
    }

    getGuardianName(): string | undefined {
        return this.guardianName;
    }

    getGuardianOccupation(): string | undefined {
        return this.guardianOccupation;
    }

    getGender(): string {
        return this.gender;
    }

    getRollNumber(): string {
        return this.rollNumber;
    }

    getUserName(): string {
        return this.userName;
    }

    getCreatedBy(): string {
        return this.createdBy;
    }



}