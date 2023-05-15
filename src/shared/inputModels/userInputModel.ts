import { UserTypes } from "@domain/enums";
import { ApiProperty } from "@nestjs/swagger";

export class UserInputModel {
    @ApiProperty({ required: true})
    name: string;
    
    @ApiProperty({ required: true})
    email: string;

    @ApiProperty({ required: true})
    password: string;

    @ApiProperty({ required: true})
    confirmPassword: string;

    @ApiProperty()
    type?: UserTypes;
}