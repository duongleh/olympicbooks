import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());

  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  if (process.env.NODE_ENV !== 'PRODUCTION') {
    const options = new DocumentBuilder().setTitle('Olymbooks API v1').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/', app, document, { swaggerOptions: { docExpansion: 'none' } });
  }

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
