import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  // BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException) // posso colocar mais de um tipo de exceção para ser capturada, ou seja, quando uma dessas exceções for lançada, o método catch vai ser executado
export class MyException<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp(); // para pegar o contexto da requisição HTTP
    const response = context.getResponse<Response>();

    const statusCode = exception.getStatus(); // para pegar o status code da exceção
    const exceptionResponse = exception.getResponse(); // para pegar a resposta da exceção, que pode ser uma string ou um objeto

    //response pode vim uma string ou um objeto, então é necessário verificar o tipo da resposta para poder extrair a mensagem de erro corretamente
    const error =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse } // se for uma string, cria um objeto com a propriedade message contendo a string
        : exceptionResponse; // se for um objeto, usa o objeto como resposta de erro

    response.status(statusCode).json({
      ...error,
      data: new Date().toISOString(), // para incluir a data e hora da resposta
      // message: 'Recurso não encontrado', // para incluir a resposta original da exceção no corpo da resposta personalizada
      // error,
    });
  }
}
