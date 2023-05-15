import { ApplicationModule } from '@main/factories/application';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApplicationModule.create()],
  controllers: [UserController],
})
export class ControllersModule {}
