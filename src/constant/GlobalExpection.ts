import { injectable } from "tsyringe";

@injectable()
export class GlobalException extends Error {
    readonly name: string;
    readonly message: string;

    constructor(name: string, message: string) {
        super(message)
        this.name = name;
        this.message = message;
    }
    errorHandling(): string {
        return this.name + this.message
    }
}

