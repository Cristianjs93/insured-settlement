import { Module } from '@nestjs/common';
import { SettlementController } from './settlement.controller';
import { SettlementService } from './settlement.service';
import { Prisma } from 'database/client';

@Module({
  controllers: [SettlementController],
  providers: [SettlementService, Prisma],
})
export class SettlementModule {}
