import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PessoasModule } from 'src/pessoas/pessoas.module';

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
  providers: [AppService],
})
export class AppModule {}
// configure(consumer: MiddlewareConsumer) {
//   //método obrigatório para configurar middlewares
//   consumer.apply(SimpleMiddleware).forRoutes({
//     //aplica o middleware para as rotas com o path
//     path: '*',
//     method: RequestMethod.ALL,
//   });
// consumer.apply(SimpleMiddleware, outroMiddleware).forRoutes({
//   //pode-se aplicar o mesmo middleware para outra rota ou outro middleware para a mesma rota ou para rotas diferentes
//   path: 'pessoas/',
//   method: RequestMethod.ALL,
// });
// }
