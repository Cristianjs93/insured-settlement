import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Healthcheck')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Server healthcheck',
  })
  @ApiOkResponse({
    example: 'Web service is available',
  })
  healthCheck() {
    return this.appService.healthCheck();
  }
}
