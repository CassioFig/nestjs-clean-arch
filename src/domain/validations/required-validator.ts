import { ValidationError } from "@domain/errors";
import { Validator } from "@domain/interfaces";

export class RequiredValidator implements Validator {
    constructor(
        private readonly value      : any,
        private readonly fieldName? : string,
    ) {}

    validate (): Error | undefined {
        if (this.value === undefined || this.value === null || this.value === "") {
            return new ValidationError(`The field ${this.fieldName} is required.`)
        }
    }
}
