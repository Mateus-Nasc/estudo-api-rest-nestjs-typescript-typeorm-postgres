import { PartialType } from '@nestjs/mapped-types';
// import {
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   MaxLength,
//   MinLength,
// } from 'class-validator';
import { CreateRecadoDto } from './create-recado.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  @IsBoolean()
  @IsOptional()
  readonly lido?: boolean;
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(4)
  // @MaxLength(55)
  // @IsOptional()
  // readonly texto?: string;
  // readonly de?: string;
  // readonly para?: string;
}
