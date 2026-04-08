export class UpdateAcademicYearDTO {
    private readonly id: number;
    private readonly academicYear: string;
    private readonly startDate: string;
    private readonly endDate: string;
    private readonly updatedBy: string;

    constructor(
        id: number,
        academicYear: string,
        startDate: string,
        endDate: string,
        updatedBy: string
    ) {
        this.id = id;
        this.academicYear = academicYear;
        this.startDate = startDate;
        this.endDate = endDate;
        this.updatedBy = updatedBy;
    }

    getId(): number {
        return this.id;
    }

    getAcademicYear(): string {
        return this.academicYear;
    }

    getStartDate(): string {
        return this.startDate;
    }

    getEndDate(): string {
        return this.endDate;
    }

    getUpdatedBy(): string {
        return this.updatedBy;
    }
}