import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Healthcheck')
export class HealthcheckController {
  constructor(private readonly healthckeckService: HealthcheckService) {}

  @Get()
  @ApiOperation({
    summary: 'Server healthcheck',
  })
  @ApiOkResponse({
    example: 'Web service is available',
  })
  healthCheck(): string {
    return this.healthckeckService.healthCheck();
  }
}
