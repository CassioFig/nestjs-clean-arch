import { EncryptService, UserRepository, Validator } from "@domain/interfaces";
import { ValidationBuilder as Builder } from '@domain/validations';
import { UserInputModel } from "@shared/inputModels";
import { UserViewModel } from "@shared/viewModels";
import { ValidationError } from "@domain/errors";
import { UseCase } from "@application/use-case";
import { UserTypes } from "@domain/enums";
import { User } from "@domain/entities";

type Input = UserInputModel;
type Output = UserViewModel;

export class CreateUser extends UseCase {
    constructor (
        private readonly _userRepository: UserRepository,
        private readonly _encryptService: EncryptService
    ) { super() }

    protected async execute (input: Input): Promise<Output> {
        const newUser = new User({
            name: input.name,
            email: input.email,
            password: input.password,
            type: input.type
        })

        const userExists = await this._userRepository.findByEmail(newUser.email);
        if (userExists) throw new ValidationError('User already exists');

        newUser.comparePassword(input.confirmPassword);
        newUser.password = this._encryptService.encrypt(newUser.password);

        const userCreated = await this._userRepository.create(newUser);
        return User.toViewModel(userCreated);
    }

    protected buildValidators(input: Input): Validator[] {
        return [
            ...Builder.of({ value: input.name, name: 'name' }).required().build(),
            ...Builder.of({ value: input.email, name: 'email' }).required().email().build(),
            ...Builder.of({ value: input.type, name: 'type' }).required().in([UserTypes.Admin, UserTypes.Employee]).build(),
            ...Builder.of({ value: input.password, name: 'password' }).required().build(),
            ...Builder.of({ value: input.confirmPassword, name: 'confirmPassword' }).required().build(),
        ];
    }
}