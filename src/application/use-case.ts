import { ValidationComposite } from "@domain/validations";
import { ValidationError } from "@domain/errors";
import { Validator } from "@domain/interfaces";

export abstract class UseCase<Input = any, Output = any> {
    protected abstract execute (input: Input): Promise<Output>

    protected buildValidators (input: any): Validator[] {
        return [];
    }

    async run (input?: Input): Promise<Output> {
        const error = this._validate(input);
        if (error) throw new ValidationError(error.message);
        return this.execute(input);
    }

    private _validate (input: any): Error | undefined {
        const validators = this.buildValidators(input);
        return new ValidationComposite(validators).validate();
    }

}