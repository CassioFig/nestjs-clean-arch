import { ValidationError } from "@domain/errors";
import { UserTypes } from "@domain/enums";
import { Entity } from "./Entity";
import { TEntityType } from "@domain/types";

export type UserEntity = TEntityType<User>

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
}