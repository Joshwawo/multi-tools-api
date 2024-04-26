import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3003);
  app.use(morgan('dev'));
  app.enableVersioning({
    // defaultVersion: '1',
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .addBasicAuth()
    .setTitle('API DOCS FOR UTILS TOOLS')
    .setDescription('API DOCS FOR UTILS TOOLS')
    .setVersion('1.0')
    .addTag('Convert')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/docs`);
}
bootstrap();
