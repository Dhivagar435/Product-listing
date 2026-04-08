export class UpdateAdmissionDtO {
    private readonly id: number;
    private readonly prefix: string;
    private readonly middleName: string;
    private readonly startSequence: number;
    private readonly updatedBy: string;

    constructor(
        id: number,
        prefix: string,
        middleName: string,
        startSquence: number,
        updatedBy: string

    ) {
        this.id = id;
        this.prefix = prefix;
        this.middleName = middleName;
        this.startSequence = startSquence;
        this.updatedBy = updatedBy;
    }


    getId(): number {
        return this.id;
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
    getUpdatedBy(): string {
        return this.updatedBy;
    }
}