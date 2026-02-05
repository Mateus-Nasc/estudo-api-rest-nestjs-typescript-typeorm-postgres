import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function inicia() {
  //await NestFactory.create: iniciando aplicação nest
  //(AppModule): carregando o modulo inicial da app
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove chaves que não estão no DTO
      forbidNonWhitelisted: true, //gera erro se chave não está no DTO
      transform: false, //tenta transformar os tipos de dados de param e dtos
    }),
  ); //habilita pipes globalmente

  await app.listen(process.env.PORT ?? 3000);
}
inicia();
