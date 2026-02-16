import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // intercepta a requisição e marca o tempo de início
    const startTime = Date.now();
    console.log(`Início da requisição: ${startTime}ms`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo

    return next.handle().pipe(
      // marca o fim da requisição e calcula o tempo decorrido
      tap(() => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        console.log(`Tempo de resposta: ${elapsedTime}ms`);
      }),
    );
  }
}
