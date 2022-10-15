import { IUserRepository } from "@domain/interfaces/repositories";
import { IServiceCommand } from "@domain/interfaces";
import { UserInputModel } from "@shared/inputModels";
import { UserViewModel } from "@shared/viewModels";
import { User } from "@domain/entities";
import { Inject } from "@nestjs/common";

export namespace CreateUser {
    export type Input   = UserInputModel
    export type Output  = UserViewModel
}
export class CreateUser implements IServiceCommand<CreateUser.Input, CreateUser.Output> {
    constructor (
        @Inject('userRepository') private readonly userRepository : IUserRepository
    ) {}

    async execute (input: CreateUser.Input): Promise<CreateUser.Output> {
        const user = new User({
            name     : input.name,
            email    : input.email,
            password : input.password,
            type     : input.type
        })

        user.comparePassword(input.confirmPassword)
        const userCreated = await this.userRepository.create(user)
        
        return {
            id        : userCreated.id,
            name      : userCreated.name,
            email     : userCreated.email,
            type      : userCreated.type,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
    }
}