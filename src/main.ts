import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT,
    () => console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`),);
}
bootstrap();
