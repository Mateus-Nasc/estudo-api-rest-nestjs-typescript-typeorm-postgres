import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        //captura o erro e o loga
        console.log('Ocorreu um erro:', error);

        if (error instanceof Error) {
          //verifica se o erro é uma instância de Error
          return throwError(() => error); // lança o erro original para que ele possa ser tratado por outros interceptors
        }

        return throwError(() => new Error(String(error))); // Converte o erro para uma string e lança um novo erro
      }),
    );
  }
}
