import { BcryptEncryptService, JWTAuthTokenService } from "@infrastructure/services";
import { UserRepository } from "@infrastructure/repositories";
import { Module, Provider } from "@nestjs/common";

const providers: Provider[] = [
    { provide: 'authTokenService', useClass: JWTAuthTokenService },
    { provide: 'encryptService', useClass: BcryptEncryptService },
    { provide: 'userRepository', useClass: UserRepository }
]

@Module({
    imports: [],
    controllers: [],
    providers: [ ...providers ],
    exports: [ ...providers ]
})
export class InfrastructureModule {}