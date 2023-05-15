import { InfrastructureModule } from "./infrastructure.module";
import { CreateUser, Login } from "@application/services";
import { Provider } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { DomainModule } from "./domain.module";

const providers: Provider[] = [
    { provide: 'createUser', useClass: CreateUser },
    { provide: 'login', useClass: Login }
]

@Module({
    imports: [
        InfrastructureModule,
        DomainModule
    ],
    controllers: [],
    providers: [ ...providers ],
    exports: [ ...providers ]
})
export class ApplicationModule {}