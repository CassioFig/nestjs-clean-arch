import { CreateUserController, LoginController } from "@web/controllers";
import { ApplicationModule } from "./application.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        ApplicationModule
    ],
    controllers: [
        CreateUserController,
        LoginController
    ],
    providers: [],
    exports: []
})
export class WebModule {}