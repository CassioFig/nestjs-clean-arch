import { RequiredValidator } from "./required-validator";
import { EmailValidator } from "./email-validator";
import { ListValidator } from "./list-validator";
import { Validator } from "@domain/interfaces";

type Field = {
    name: string
    value: any
}

export class ValidationBuilder {
    private constructor(
        private readonly value      : any,
        private readonly fieldName? : string,
        private readonly validators : Validator[] = [],
    ) {}

    static of ({ value, name }: Field): ValidationBuilder {
        return new ValidationBuilder(value, name);
    }

    required (): ValidationBuilder {
        this.validators.push(new RequiredValidator(this.value, this.fieldName));
        return this
    }

    in (values: any[]): ValidationBuilder {
        this.validators.push(new ListValidator(this.value, values, this.fieldName));
        return this;
    }

    email (): ValidationBuilder {
        this.validators.push(new EmailValidator(this.value));
        return this;
    }

    build (): Validator[] {
        return this.validators;
    }
}
