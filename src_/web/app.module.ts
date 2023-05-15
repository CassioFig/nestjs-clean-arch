import { ApplicationModule, DomainModule, InfrastructureModule, } from './modules';
import { Module } from '@nestjs/common';
import { WebModule } from './modules/web.module';

@Module({
  imports: [
    ApplicationModule,
    InfrastructureModule,
    DomainModule,
    WebModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
