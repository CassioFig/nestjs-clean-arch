import { IAuthService, IAuthTokenService, IServiceCommand } from "@domain/interfaces";
import { LoginInputModel } from "@shared/inputModels";
import { LoginViewModel } from "@shared/viewModels";
import { ValidationError } from "@domain/errors";
import { TUserToken } from "@domain/types";
import { Inject } from "@nestjs/common";

export namespace Login {
    export type Input  = LoginInputModel
    export type Output = LoginViewModel
}

export class Login implements IServiceCommand<Login.Input, Login.Output> {
    constructor (
        @Inject('authService') private readonly authService           : IAuthService,
        @Inject('authTokenService') private readonly authTokenService : IAuthTokenService
    ) {}

    async execute(input: Login.Input): Promise<Login.Output> {
        const user = await this.authService.validateUser(input.email, input.password)
        if (!user) throw new ValidationError('Invalid credentials')

        const token = this.authTokenService.generate<TUserToken>({
            info: {
                userId : user.id,
                email  : user.email,
                type   : user.type
            }
        })

        return { token }
    }
}