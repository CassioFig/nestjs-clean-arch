import { UserViewModel } from "@shared/viewModels";
import { ValidationError } from "@domain/errors";
import { EntityType } from "@domain/types";
import { UserTypes } from "@domain/enums";
import { Entity } from "./entity";

export type UserEntity = EntityType<User>
export class User extends Entity {
    name     : string
    email    : string
    password : string
    type?    : UserTypes

    constructor (user: UserEntity) {
        super(user)
        this.name     = user.name
        this.email    = user.email
        this.password = user.password
        this.type     = user.type
    }

    comparePassword (confirmPassword: string): void | Error {
        const isPasswordEqual = this.password === confirmPassword
        if (!isPasswordEqual) throw new ValidationError("Password does not match.")
    }

    static toViewModel (user: UserEntity): UserViewModel {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}