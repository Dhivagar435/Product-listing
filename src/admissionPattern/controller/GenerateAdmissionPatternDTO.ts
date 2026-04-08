export class AutoGenerateAdmissionDTO {
    private readonly patternId: number;

    constructor(
        patternId: number
    ) {
        this.patternId = patternId
    }

    getPatternId(): number {
        return this.patternId;
    }
}