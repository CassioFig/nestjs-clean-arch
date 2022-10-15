import { UserTypes } from "@domain/enums"

export type UserViewModel = {
    id?        : string
    name       : string
    email      : string
    type       : UserTypes
    createdAt? : Date
    updatedAt? : Date
}