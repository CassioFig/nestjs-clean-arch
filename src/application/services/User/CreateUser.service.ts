import { UserInputModel } from "@application/inputModels";
import { UserViewModel } from "@application/viewModels";
import { IServiceCommand } from "@domain/interfaces";

export class CreateUser implements IServiceCommand<CreateUser.Input, CreateUser.Output> {
    constructor () {}

    async execute (input: CreateUser.Input): Promise<CreateUser.Output> {
        return null
    }
}

export namespace CreateUser {
    export type Input   = UserInputModel
    export type Output  = UserViewModel
}