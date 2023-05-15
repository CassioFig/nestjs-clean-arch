import { BcryptEncryptService } from "@infrastructure/services";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    providers: [
        BcryptEncryptService
    ],
    exports: [
        BcryptEncryptService
    ]
})
export class ServicesModule {}