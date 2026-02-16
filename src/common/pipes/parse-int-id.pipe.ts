import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: 'id', metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      // verifica se o parâmetro é do tipo 'param' e se o nome do parâmetro é 'id'
      return value; // se não for um parâmetro 'id', retorna o valor sem transformação
    }

    const parsedValue = Number(value); // tenta converter o valor para um número inteiro

    if (isNaN(parsedValue)) {
      // se o valor não é um número
      throw new BadRequestException(
        `O valor '${value}' não é um número inteiro válido`,
      ); // lança um erro se a conversão falhar
    }

    if (parsedValue <= 0) {
      throw new BadRequestException(
        `O valor '${value}' deve ser um número inteiro positivo`,
      ); // lança um erro se o número for zero ou negativo
    }

    return parsedValue;
  }
}
