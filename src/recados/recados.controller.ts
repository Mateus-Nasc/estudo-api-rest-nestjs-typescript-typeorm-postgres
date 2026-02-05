import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

interface PaginationQuery {
  limit?: string;
  offset?: string;
}

@Controller('recados')
export class RecadosController {
  // Injeção de dependência; o Nest cria e fornece a instância do Service automaticamente
  constructor(private readonly recadosService: RecadosService) {}
  //encontra todos os recados
  @Get()
  findAll(@Query() pagination: PaginationQuery) {
    return this.recadosService.findAll();
  }

  //encontra um recado
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // return `Essa rota ler e retorna o recado com ID: ${id}`;
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    // return 'Essa rota cria um recado';
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
