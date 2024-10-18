import { Injectable } from '@nestjs/common';
import { Premium, Protections } from '@prisma/client';
import { Prisma } from 'database/client';
import { SettlementReq, SettlementRes } from 'models/Settlement';
import { errorValidation } from 'utils/errorValidation';
import {
  calculateCustomerAge,
  calculateSettlements,
  calculateTotalValue,
} from 'utils/helpers';

@Injectable()
export class SettlementService {
  constructor(private prisma: Prisma) {}

  async calculateSettlement(body: SettlementReq): Promise<SettlementRes> {
    try {
      const { identificationType, identificationNumber, insuredValue } = body;
      errorValidation(identificationType, identificationNumber, insuredValue);

      const customer = await this.getCustomerOrThrow(
        identificationType,
        identificationNumber,
      );
      const customerAge = calculateCustomerAge(customer);

      const premiums = await this.getPremiumsByCustomerAge(customerAge);
      const settlements = calculateSettlements(premiums, insuredValue);
      const totalValue = calculateTotalValue(settlements);

      return {
        identificationType,
        identificationNumber,
        insuredValue,
        settlements,
        totalValue,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCustomerOrThrow(
    identificationType: number,
    identificationNumber: string,
  ) {
    const customer = await this.prisma.insured.findFirst({
      where: { identificationType, identificationNumber },
    });
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  getPremiumsByCustomerAge(
    customerAge: number,
  ): Promise<(Premium & { protection: Protections })[]> {
    return this.prisma.premium.findMany({
      where: {
        minAge: { lte: customerAge },
        maxAge: { gte: customerAge },
      },
      include: {
        protection: true,
      },
    });
  }
}
