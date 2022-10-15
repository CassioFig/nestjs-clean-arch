import { ValidationError } from "@domain/errors";
import { UserTypes } from "@domain/enums";
import { Entity } from "./Entity";

export class User extends Entity {
    name     : string
    email    : string
    password : string
    type?    : UserTypes

    constructor (user: User) {
        super(user)
        this.name     = user.name
        this.password = user.password
        this.type     = user.type
    }

    comparePassword (confirmPassword: string): void | Error {
        const isPasswordEqual = this.password === confirmPassword
        if (!isPasswordEqual) throw new ValidationError("Password does not match.")
    }
}