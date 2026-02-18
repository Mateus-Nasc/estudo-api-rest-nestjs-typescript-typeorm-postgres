import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';
// import { IsAdminGuard } from './common/guards/isAdmin.guard';

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
    new ParseIntIdPipe(), //habilita o pipe globalmente, o pipe vai ser aplicado automaticamente em todos os métodos que receberem um parâmetro 'id' do tipo 'param' ; todos os métodos que tiverem um parâmetro 'id' na rota
  ); //habilita pipes globalmente

  // app.useGlobalGuards(new IsAdminGuard()); //usando new não posso usar injeção de dependências, ou seja, não posso usar serviços dentro do IsAdminGuard

  await app.listen(process.env.PORT ?? 3000);
}
inicia();
