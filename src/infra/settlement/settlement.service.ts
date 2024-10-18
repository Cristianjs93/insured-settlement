import { Injectable } from '@nestjs/common';
import { Prisma } from 'database/client';
import { SettlementReq } from 'models/Settlement';

@Injectable()
export class SettlementService {
  constructor(private prisma: Prisma) {}

  async calculateSettlement(body: SettlementReq): Promise<any> {
    console.log(body);
    return await this.prisma.protections.findMany({});
  }
}
