export enum UserTypes {
    Admin    = "A",
    Employee = "E"
}

export namespace UserType {
    export const userIsAdmin    = (userType: UserTypes) => userType === UserTypes.Admin
    export const userIsEmployee = (userType: UserTypes) => userType === UserTypes.Employee
}