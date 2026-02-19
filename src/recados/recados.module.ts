import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils, RecadosUtilsMock } from './recados.utils';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), PessoasModule],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils, //esse token é o que vamos usar para injetar essa dependência em outros lugares do código, por exemplo, no controller ou no service
      useValue: new RecadosUtilsMock(), //esse useValue ta fingindo ser a implementação real do RecadosUtils, mas na verdade é uma implementação mockada, que pode ser usada para testes ou para desenvolvimento, sem precisar da implementação real do RecadosUtils, que pode ser mais complexa ou depender de outras coisas
      // useClass: RecadosUtils, //esse useClass ta dizendo que a implementação real do RecadosUtils é a própria classe RecadosUtils, ou seja, quando alguém injetar o token RecadosUtils, ele vai receber uma instância da classe RecadosUtils, com todos os seus métodos e propriedades, e não uma implementação mockada
    },
  ],
  exports: [RecadosUtils],
})
export class RecadosModule {}
