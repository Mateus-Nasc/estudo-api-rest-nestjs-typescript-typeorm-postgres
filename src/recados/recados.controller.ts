import {
  // BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  // Req,
  // UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// @UseInterceptors(ChangeDataInterceptor)
@Controller('recados')
// @UsePipes(ParseIntIdPipe) //o pipe vai ser aplicado automaticamente em todos os metodos que receberem um parametro 'id' do tipo 'param', ou seja, em todos os metodos que tiverem um parametro 'id' na rota
export class RecadosController {
  // Injeção de dependência; o Nest cria e fornece a instância do Service automaticamente
  constructor(private readonly recadosService: RecadosService) {}
  //encontra todos os recados
  @Get()
  // @UseInterceptors(TimingConnectionInterceptor)
  async findAll(@Query() paginationDto: PaginationDto) {
    const recados = await this.recadosService.findAll(paginationDto);

    // throw new BadRequestException(''); //o Nest vai capturar essa exceção e passar para o filtro, que vai retornar a resposta personalizada

    return recados;
  }

  //encontra um recado
  @Get(':id') //para garantir que o id seja um número inteiro, se não for, o Nest lança um erro 400 automaticamente
  // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor) //aplica o interceptor apenas nesse método
  findOne(@Param('id') id: number) {
    // return `Essa rota ler e retorna o recado com ID;
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    // return 'Essa rota cria um recado';
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
