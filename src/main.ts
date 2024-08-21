import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //prevents the insertion of additional fields
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
