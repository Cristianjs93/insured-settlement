import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Prisma } from './database/client';
import { SettlementModule } from 'infra/settlement/settlement.module';

@Module({
  controllers: [AppController],
  providers: [AppService, Prisma],
  imports: [SettlementModule],
})
export class AppModule {}
