import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { of, tap } from 'rxjs';
import { Request } from 'express';

export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map(); // cache simples usando um Map para armazenar os dados

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Intercepta a requisição e verifica se a resposta para a URL já está em cache
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url; // obtém a URL da requisição

    if (this.cache.has(url)) {
      // se a resposta para a URL já estiver em cache, retorna a resposta armazenada
      console.log(`Cache hit para a URL: ${url}`);
      return of(this.cache.get(url));
    }

    return next.handle().pipe(
      //se a resposta para a URL não estiver em cache, processa a requisição normalmente e armazena a resposta no cache
      tap(data => {
        this.cache.set(url, data);
        console.log(`Cache atualizado para a URL: ${url}`);
      }),
    );
  }
}
// este não vai ser usado pois ele não é tão eficiente, ele armazena a resposta completa para cada URL, o que pode consumir muita memória se houver muitas URLs ou respostas grandes. Além disso, ele não tem um mecanismo de expiração, então as respostas armazenadas permanecerão no cache indefinidamente, o que pode levar a problemas de memória a longo prazo
//este exemplo foi só para entender o conceito de cache
