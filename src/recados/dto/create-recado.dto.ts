import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @IsString({
    message: 'O texto do recado deve ser uma string',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @IsPositive() //valida se o número é positivo, ou seja, um id válido
  deId: number; //recebo id da pessoa que enviou o recado

  @IsPositive()
  paraId: number;
  // @IsString({
  //   message: 'O campo "de" deve ser uma string',
  // })
  // @IsNotEmpty()
  // @MinLength(4)
  // @MaxLength(55)
  // readonly de: string;

  // @IsString({
  //   message: 'O campo "para" deve ser uma string',
  // })
  // @IsNotEmpty()
  // @MinLength(4)
  // @MaxLength(55)
  // readonly para: string;
}
//o que preciso p criar um recado.
//nada de id, lido ou data, pq isso é gerenciado pelo sistema
