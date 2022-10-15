import { IAuthTokenService, IEncryptService, IServiceCommand } from "@domain/interfaces";
import { IUserRepository } from "@domain/interfaces/repositories";
import { UserInputModel } from "src/common/inputModels";
import { LoginViewModel, UserViewModel } from "src/common/viewModels";
import { User } from "@domain/entities";
import { Inject } from "@nestjs/common";
import { TUserToken } from "@domain/types";

export namespace CreateUser {
    export type Input  = UserInputModel
    export type Output = UserViewModel & LoginViewModel
}
export class CreateUser implements IServiceCommand<CreateUser.Input, CreateUser.Output> {
    constructor (
        @Inject('userRepository') private readonly userRepository     : IUserRepository,
        @Inject('encryptService') private readonly encryptService     : IEncryptService,
        @Inject('authTokenService') private readonly authTokenService : IAuthTokenService
    ) {}

    async execute (input: CreateUser.Input): Promise<CreateUser.Output> {
        const user = new User({
            name     : input.name,
            email    : input.email,
            password : input.password,
            type     : input.type
        })

        user.comparePassword(input.confirmPassword)
        user.password = this.encryptService.encrypt(user.password)

        const userCreated = await this.userRepository.create(user)

        const token = this.authTokenService.generate<TUserToken>({
            info: {
                userId : userCreated.id,
                email  : userCreated.email,
                type   : userCreated.type
            }
        })
        
        return {
            id        : userCreated.id,
            name      : userCreated.name,
            email     : userCreated.email,
            type      : userCreated.type,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt,
            token     : token
        }
    }
}