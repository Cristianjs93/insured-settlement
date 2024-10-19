import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;
  let service: HealthcheckService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile();
    controller = app.get<HealthcheckController>(HealthcheckController);
    service = app.get<HealthcheckService>(HealthcheckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Healthcheck', () => {
    it('should return "Web service is available"', () => {
      const serviceResponse = 'Web service is available';
      jest.spyOn(service, 'healthCheck').mockReturnValue(serviceResponse);
      expect(controller.healthCheck()).toBe('Web service is available');
    });
  });
});
