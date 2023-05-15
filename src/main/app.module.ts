import { InfrastructureModule } from './factories/infrastructure';
import { ApplicationModule } from './factories/application';
import { Module } from '@nestjs/common';
import { ControllersModule } from '@web/controllers/controllers.module';

@Module({
  imports: [
    ControllersModule,
    ApplicationModule.create(),
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
