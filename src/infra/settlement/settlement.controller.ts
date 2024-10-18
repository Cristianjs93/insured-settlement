import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
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
    try {
      return await this.settlementService.calculateSettlement(body);
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
