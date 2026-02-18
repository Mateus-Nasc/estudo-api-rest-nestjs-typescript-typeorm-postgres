import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ErrorExceptionFilter } from 'src/common/filters/errorException.filter';
import { IsAdminGuard } from 'src/common/guards/isAdmin.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //carrega todas as entidades automaticamente
      synchronize: true, //sincroniza com o BD. Não deve ser usado em produção
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER, //para registrar o filtro globalmente, ou seja, para todas as exceções do tipo BadRequestException lançadas em qualquer parte da aplicação, o Nest vai usar esse filtro para tratar a resposta
      useClass: ErrorExceptionFilter, //para usar a classe do filtro que criamos, ou seja, o Nest vai instanciar essa classe e usar o método catch para tratar as exceções do tipo BadRequestException
    },
    {
      provide: APP_GUARD, //para registrar o guard globalmente, ou seja, para todas as exceções do tipo BadRequestException lançadas em qualquer parte da aplicação, o Nest vai usar esse guard para tratar a resposta
      useClass: IsAdminGuard, //para usar a classe do guard que criamos, ou seja, o Nest vai instanciar essa classe e usar o método canActivate para tratar as exceções do tipo BadRequestException
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //método obrigatório para configurar middlewares
    consumer.apply(SimpleMiddleware).forRoutes({
      //aplica o middleware para as rotas com o path
      path: '*',
      method: RequestMethod.ALL,
    });
    // consumer.apply(SimpleMiddleware, outroMiddleware).forRoutes({
    //   //pode-se aplicar o mesmo middleware para outra rota ou outro middleware para a mesma rota ou para rotas diferentes
    //   path: 'pessoas/',
    //   method: RequestMethod.ALL,
    // });
  }
}
