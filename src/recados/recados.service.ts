import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  // para erros 404
  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    //posso manipular os recados aqui se quiser
    return recados;
  }

  async findOne(id: number) {
    //find recebe uma função que me retorna o item e posso testar o item com alguma coisa
    //const recado = this.recados.find(item => item.id === id);
    const recado = await this.recadoRepository.findOne({
      //encontra um recado
      where: {
        //onde o id for igual ao id que eu passei. id: id, pode ser só {id,}
        id: id,
      },
    });
    if (recado) return recado;

    // este pode ser usado:
    // throw new HttpException('Recado não encontrado', HttpStatus.NOT_FOUND);
    //  este é o atalho para o de cima:
    // throw new NotFoundException('Recado não encontrado');
    this.throwNotFoundError();
  }

  // cria um novo recado usando os dados validados do DTO
  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadoRepository.create(novoRecado);

    return await this.recadoRepository.save(recado);
  }

  // atualiza um recado existente
  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.recadoRepository.preload({
      id,
      ...updateRecadoDto,
    });

    if (!recado) {
      this.throwNotFoundError();
    }
    return this.recadoRepository.save(recado!);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({
      id,
    });

    if (!recado) {
      this.throwNotFoundError();
    }
    return this.recadoRepository.remove(recado!);
  }
}
