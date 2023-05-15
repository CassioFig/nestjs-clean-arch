import { RepositoriesModule } from "./repositories.module";
import { ServicesModule } from "./services.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        RepositoriesModule,
        ServicesModule
    ],
    exports: [
        RepositoriesModule,
        ServicesModule
    ]
})
export class InfrastructureModule {}