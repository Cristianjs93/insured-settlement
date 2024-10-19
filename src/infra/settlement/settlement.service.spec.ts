import { Test, TestingModule } from '@nestjs/testing';
import { SettlementService } from './settlement.service';
import { Prisma } from '@database/client';
import { SettlementReq } from '@domain/models/Settlement';

describe('SettlementService', () => {
  let service: SettlementService;
  let prismaMock: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SettlementService,
        {
          provide: Prisma,
          useValue: {
            insured: {
              findFirst: jest.fn(),
            },
            premium: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    service = app.get<SettlementService>(SettlementService);
    prismaMock = app.get<Prisma>(Prisma);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateSettlement', () => {
    it('should throw validation error with message "There are missing fields to calculate the settlement"', async () => {
      const errorValidation = new Error(
        'There are missing fields to calculate the settlement',
      );
      const newSettlement = {
        identificationType: 1,
        identificationNumber: '79000002',
      } as SettlementReq;
      await expect(service.calculateSettlement(newSettlement)).rejects.toThrow(
        errorValidation,
      );
    });

    it('should throw error with message "The insured value must be greater than zero"', async () => {
      const errorValidation = new Error(
        'The insured value must be greater than zero',
      );
      const newSettlement = {
        identificationType: 1,
        identificationNumber: '79000002',
        insuredValue: 0,
      };
      await expect(service.calculateSettlement(newSettlement)).rejects.toThrow(
        errorValidation,
      );
    });

    it('should throw error with message "Customer not found', async () => {
      const customerError = new Error('Customer not found');
      const newSettlement = {
        identificationType: 2,
        identificationNumber: '79000002',
        insuredValue: 1000000,
      };
      prismaMock.insured.findFirst.mockResolvedValue(null);
      await expect(service.calculateSettlement(newSettlement)).rejects.toThrow(
        customerError,
      );
    });

    it('should calculate a premium settlement for the insured', async () => {
      const newSettlement = {
        identificationType: 1,
        identificationNumber: '79000002',
        insuredValue: 1000000,
      };
      prismaMock.insured.findFirst.mockResolvedValue({
        id: 2,
        identificationType: 1,
        identificationNumber: '79000002',
        lastname: 'Apellido 2',
        name: 'Nombre 2',
        gender: 1,
        birthDate: '1950-01-10T00:00:00.000Z',
      });
      prismaMock.premium.findMany.mockResolvedValue([
        {
          id: 2,
          minAge: 46,
          maxAge: 75,
          percent: 0.02012,
          protectionId: 1,
          protection: { id: 1, name: 'Muerte accidental' },
        },
      ]);
      const result = {
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
      await expect(service.calculateSettlement(newSettlement)).resolves.toEqual(
        result,
      );
    });
  });
});
