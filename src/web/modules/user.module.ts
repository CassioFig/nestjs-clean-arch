import { CreateUserController } from "@web/controllers";
import { CreateUser } from "@application/services";
import { Module } from '@nestjs/common';
import { UserRepository } from "@infrastructure/repositories";

@Module({
    imports: [],
    controllers: [
        CreateUserController
    ],
    providers: [
        {
            provide: 'createUser',
            useClass: CreateUser
        },
        {
            provide: 'userRepository',
            useClass: UserRepository
        }
    ]
})
export class UserModule { }