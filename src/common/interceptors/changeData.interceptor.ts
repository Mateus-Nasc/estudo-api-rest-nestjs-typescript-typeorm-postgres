import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class ChangeDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((data: unknown) => {
        if (Array.isArray(data)) {
          return {
            data,
            count: data.length, // Adiciona a contagem de itens no array
          }; // Retorna o objeto modificado ou original
        }
        return data; // Retorna o objeto modificado ou original
      }),
    );
  }
}
