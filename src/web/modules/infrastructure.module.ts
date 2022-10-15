import { BcryptEncryptService, JWTAuthTokenService } from "@infrastructure/services";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    controllers: [],
    providers: [
        { provide: 'authTokenService', useClass: JWTAuthTokenService },
        { provide: 'encryptService', useClass: BcryptEncryptService },
    ],
    exports: [
        { provide: 'authTokenService', useClass: JWTAuthTokenService },
        { provide: 'encryptService', useClass: BcryptEncryptService },
    ]
})
export class InfrastructureModule {}