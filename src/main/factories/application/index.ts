import { PostgreUserRepository } from "@infrastructure/repositories";
import { BcryptEncryptService } from "@infrastructure/services";
import { InfrastructureModule } from "../infrastructure";
import { Module, DynamicModule } from "@nestjs/common";
import { UseCaseProxy } from "./use-case-proxy";
import { CreateUser } from "@application/user";

@Module({
    imports: [InfrastructureModule]
})
export class ApplicationModule {
    static CREATE_USER_PROXY = 'CreateUser';

    static create(): DynamicModule {
        return {
            module: ApplicationModule,
            providers: [
                {
                    inject: [PostgreUserRepository, BcryptEncryptService],
                    provide: ApplicationModule.CREATE_USER_PROXY,
                    useFactory: (
                        userRepository: PostgreUserRepository,
                        encryptService: BcryptEncryptService
                    ) => new UseCaseProxy(new CreateUser(userRepository, encryptService))
                }
            ],
            exports: [
                ApplicationModule.CREATE_USER_PROXY
            ]
        }
    }
}