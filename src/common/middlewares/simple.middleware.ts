import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware foi chamado');
    next(); //chama o próximo middleware ou o controller, caso não haja mais middlewares

    return res.status(404).send({
      message: 'Rota não encontrada',
    });
  }
}
