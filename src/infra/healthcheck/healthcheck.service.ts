import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  healthCheck(): string {
    return 'Web service is available';
  }
}
