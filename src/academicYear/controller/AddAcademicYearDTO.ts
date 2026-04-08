export class AddAcademicYearDTO {
    private readonly academicYear: string;
    private readonly startDate: string;
    private readonly endDate: string;
    private readonly createdBy: string;

    constructor(
        academicYear: string,
        startDate: string,
        endDate: string,
        createdBy: string
    ) {
        this.academicYear = academicYear;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdBy = createdBy;
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

    getCreatedBy(): string {
        return this.createdBy;
    }
}