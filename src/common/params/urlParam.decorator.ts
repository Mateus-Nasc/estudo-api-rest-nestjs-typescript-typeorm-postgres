import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UrlParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    //data é o valor passado para o decorator, no caso, não estamos passando nada, então é do tipo unknown
    const context = ctx.switchToHttp();
    const request: Request = context.getRequest();

    return request.url;
  },
);
