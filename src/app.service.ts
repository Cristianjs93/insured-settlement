import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return 'Web service is available';
  }
}
