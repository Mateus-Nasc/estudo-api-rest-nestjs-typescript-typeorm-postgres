import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional() //indica que o campo é opcional, ou seja, pode ser omitido na requisição
  @IsInt() //indica que o campo deve ser um número inteiro
  @Min(0) //indica que o valor mínimo permitido para o campo é 0
  @Max(50) // valor máximo permitido para o campo é 50
  @Type(() => Number) //indica que o valor do campo deve ser transformado para um número, mesmo que venha como string na requisição
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
