import { AuthService } from "@domain/services";
import { Provider } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure.module";

const providers: Provider[] = [
    { provide: 'authService', useClass: AuthService }
]

@Module({
    imports: [
        InfrastructureModule,
    ],
    controllers: [],
    providers: [ ...providers ],
    exports: [ ...providers ]
})
export class DomainModule {}