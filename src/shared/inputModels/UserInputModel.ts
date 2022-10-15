import { UserTypes } from "@domain/enums"
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsIn, IsNotEmpty } from "class-validator"

export class UserInputModel {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name            : string

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    email           : string

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    password        : string

    @ApiProperty()
    @IsNotEmpty({ message: 'Confirm password is required' })
    confirmPassword : string

    @ApiProperty({ required: false, enum: UserTypes })
    @IsIn(Object.values(UserTypes), { message: 'Type is invalid' })
    type?           : UserTypes
}