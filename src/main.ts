import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/errorHandler/exception-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(morgan('dev'));
  app.enableVersioning({
    // defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .addBasicAuth()
  .setTitle('API DOCS FOR UTILS TOOLS')
  .setDescription('API DOCS FOR UTILS TOOLS')
  .setVersion('1.0')
  .addTag('Convert')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3003);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/docs`);
}
bootstrap();
