import { UserTypes } from "@domain/enums";
import { ApiProperty } from "@nestjs/swagger";

export class UserViewModel {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    type: UserTypes;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}