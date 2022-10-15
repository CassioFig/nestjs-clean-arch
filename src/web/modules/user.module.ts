import { InfrastructureModule } from "./infrastructure.module";
import { UserRepository } from "@infrastructure/repositories";
import { CreateUserController } from "@web/controllers";
import { CreateUser } from "@application/services";
import { Module } from '@nestjs/common';

@Module({
    imports: [
        InfrastructureModule
    ],
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