import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Insured Settlement')
  .setDescription('Settlement calculation for insured customers')
  .setVersion('1')
  .build();

export default swaggerConfig;
