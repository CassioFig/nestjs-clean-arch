import { ValidationError } from "@domain/errors"
import { Validator } from "@domain/interfaces"

export class EmailValidator implements Validator {
    constructor(
        private readonly value : any,
    ) {}

    validate (): Error | undefined {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
        const validEmail = emailRegex.test(this.value)
        if (!validEmail) return new ValidationError('Invalid e-mail.')
    }
}
