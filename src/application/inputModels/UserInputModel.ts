import { UserTypes } from "@domain/enums"

export class UserInputModel {
    name            : string
    email           : string
    password        : string
    confirmPassword : string
    type?           : UserTypes

    constructor (user: UserInputModel) {
        this.name            = user.name
        this.email           = user.email
        this.password        = user.password
        this.confirmPassword = user.confirmPassword
        this.type            = user.type
    }
}