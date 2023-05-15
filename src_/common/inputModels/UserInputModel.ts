import { IsEmail, IsIn, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { UserTypes } from "@domain/enums"

export class UserInputModel {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name            : string

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email is invalid' })
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