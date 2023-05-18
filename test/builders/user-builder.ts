import { UserTypes } from "@domain/enums";
import { UserInputModel } from "@shared/inputModels";

export class UserBuilder {
    private _user: UserInputModel = {
        id: '0',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        confirmPassword: 'valid_password',
        type: null,
    }

    static user (): UserBuilder { return new UserBuilder(); }

    type (type: UserTypes): UserBuilder {
        this._user.type = type;
        return this;
    }

    withInvalidEmail (): UserBuilder {
        this._user.email = 'invalid_email';
        return this;
    }

    withInvalidPassword (): UserBuilder {
        this._user.confirmPassword = 'invalid_password';
        return this;
    }

    build (): UserInputModel { return this._user; }
}