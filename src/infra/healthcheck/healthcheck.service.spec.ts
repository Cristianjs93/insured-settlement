import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckService } from './healthcheck.service';

describe('HealthcheckService', () => {
  let service: HealthcheckService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [HealthcheckService],
    }).compile();
    service = app.get<HealthcheckService>(HealthcheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('healthCheck', () => {
    it('should return "Web service is available"', () => {
      expect(service.healthCheck()).toBe('Web service is available');
    });
  });
});
