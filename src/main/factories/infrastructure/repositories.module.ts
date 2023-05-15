import { PostgreUserRepository } from "@infrastructure/repositories";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    providers: [
        PostgreUserRepository
    ],
    exports: [
        PostgreUserRepository
    ]
})
export class RepositoriesModule {}