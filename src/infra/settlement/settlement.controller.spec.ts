import { Test, TestingModule } from '@nestjs/testing';
import { SettlementController } from './settlement.controller';
import { SettlementService } from './settlement.service';
import { Prisma } from '@database/client';
import { SettlementReq } from '@domain/models/Settlement';

describe('SettlementController', () => {
  let controller: SettlementController;
  let service: SettlementService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SettlementController],
      providers: [SettlementService, { provide: Prisma, useValue: {} }],
    }).compile();

    controller = app.get<SettlementController>(SettlementController);
    service = app.get<SettlementService>(SettlementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculateSettlement', () => {
    it('should throw error with message', async () => {
      const newSettlement = {
        identificationType: 1,
        identificationNumber: '79000002',
      } as SettlementReq;
      const serviceError = new Error(
        'There are missing fields to calculate the settlement',
      );
      jest
        .spyOn(service, 'calculateSettlement')
        .mockRejectedValue(serviceError);
      await expect(
        controller.calculateSettlement(newSettlement),
      ).rejects.toThrow(Error);
    });

    it('should return a premium settlement for the insured', async () => {
      const newSettlement = {
        identificationType: 1,
        identificationNumber: '79000002',
        insuredValue: 0,
      };
      const serviceResponse = {
        identificationType: 1,
        identificationNumber: '79000002',
        insuredValue: 1000000,
        settlements: [
          {
            protectionId: 1,
            protectionName: 'Muerte accidental',
            premiumValue: 20120,
          },
        ],
        totalValue: 20120,
      };
      jest
        .spyOn(service, 'calculateSettlement')
        .mockResolvedValue(serviceResponse);
      await expect(
        controller.calculateSettlement(newSettlement),
      ).resolves.toEqual(serviceResponse);
    });
  });
});
