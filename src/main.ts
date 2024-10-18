import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './config/swagger.config';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT || 3001;

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
  writeFileSync('docs/swagger.json', JSON.stringify(document, null, 2));

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
  console.log(`Documentation: ${await app.getUrl()}/api/docs`);
}
bootstrap();
