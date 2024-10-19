import { Module } from '@nestjs/common';
import { SettlementModule } from 'infra/settlement/settlement.module';
import { HealthcheckModule } from 'infra/healthcheck/healthcheck.module';

@Module({
  imports: [HealthcheckModule, SettlementModule],
})
export class AppModule {}
