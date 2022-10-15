import { InfrastructureModule, UserModule } from './modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    InfrastructureModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
