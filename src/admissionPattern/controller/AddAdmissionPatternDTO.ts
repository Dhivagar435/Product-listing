export class AddAdmissionDtO {
    private readonly prefix: string;
    private readonly middleName: string;
    private readonly startSequence: number;
    private academicYearId?: number;
    private readonly createdBy: string;

    constructor(
        prefix: string,
        middleName: string,
        startSquence: number,
        createdBy: string

    ) {
        this.prefix = prefix;
        this.middleName = middleName;
        this.startSequence = startSquence;
        this.createdBy = createdBy;
    }

    setAcademicYearId(academicYearId: number): void {
        this.academicYearId = academicYearId;
    }

    getPrefix(): string {
        return this.prefix;
    }
    getMiddleName(): string {
        return this.middleName;
    }
    getStartSequence(): number {
        return this.startSequence;
    }
    getCreatedBy(): string {
        return this.createdBy;
    }

    getAcademicYearId(): number | undefined {
        return this.academicYearId
    }
}