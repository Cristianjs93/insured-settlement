import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class SettlementReq {
  @ApiProperty({
    description: 'Customer identification type',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  identificationType: number;

  @ApiProperty({
    description: 'Customer identification number',
    example: '79000001',
  })
  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @ApiProperty({
    description: 'Base value for insurance calculation',
    example: 1000000,
  })
  @IsNumber()
  @IsNotEmpty()
  insuredValue: number;
}

export class SettlementRes extends SettlementReq {
  @ApiProperty({
    description: 'List of settlements with protection and premium details',
    type: () => [SettlementDetail],
  })
  settlement: SettlementDetail[];

  @ApiProperty({
    description: 'Insurance total value',
    example: 100000,
  })
  @IsNumber()
  @IsNotEmpty()
  totalValue: number;
}

export class SettlementDetail {
  @ApiProperty({
    description: 'ID of the protection',
    example: 1,
  })
  @IsNumber()
  protectionId: number;

  @ApiProperty({
    description: 'Name of the protection',
    example: 'Muerte accidental',
  })
  protectionName: string;

  @ApiProperty({
    description: 'Value of the premium',
    example: 100000,
  })
  @IsNumber()
  premiumValue: number;
}
