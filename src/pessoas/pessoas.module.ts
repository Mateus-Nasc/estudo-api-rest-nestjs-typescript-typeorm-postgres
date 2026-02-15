import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [PessoasService], //exporta o serviço para que ele possa ser usado no módulo de recados
})
export class PessoasModule {}
