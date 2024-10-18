import { Body, Controller, Post } from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { SettlementReq, SettlementRes } from 'models/Settlement';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('settlement')
@ApiTags('Settlement')
export class SettlementController {
  constructor(private settlementService: SettlementService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a settlement for a specified customer',
  })
  @ApiOkResponse({
    description: 'Settlement created successfully',
    type: [SettlementRes],
  })
  async calculateSettlement(
    @Body() body: SettlementReq,
  ): Promise<SettlementRes> {
    return this.settlementService.calculateSettlement(body);
  }
}
