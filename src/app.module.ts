import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ClientsModule, AuthModule],
})
export class AppModule {}
