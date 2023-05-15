import { ValidationError } from "@domain/errors";
import { Validator } from "@domain/interfaces";

export class ListValidator implements Validator {
    constructor(
        private readonly value      : any,
        private readonly values     : any[],
        private readonly fieldName? : string,
    ) {}

    validate (): Error | undefined {
        if (!!this.value && !this.values.includes(this.value)) {
            return new ValidationError(`The field ${this.fieldName} is invalid. Valid values: ${this.values.join(', ')}`)
        }
    }
}
