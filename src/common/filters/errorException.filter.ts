import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express'; // Importe o tipo do Express

@Catch() // Deixe vazio para pegar TUDO (HttpException e Error genérico)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>(); // Tipagem ajuda o intellisense
    const request = context.getRequest(); // Não é necessário tipar o request, pois o Nest já faz isso internamente

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Erro interno do servidor', error: String(exception) };

    // se a resposta for uma string, transformamos em objeto
    const errorBody =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse;

    //a resposta final
    response.status(status).json({
      ...errorBody, // Agora é seguro fazer o spread
      timestamp: new Date().toISOString(), // "data" costuma ser payload, timestamp é melhor pra data
      path: request.url,
    });
  }
}
