import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Insured Settlement')
  .setDescription('Settlement calculation for insured customers')
  .setVersion('1.0.0')
  .build();

export default swaggerConfig;
