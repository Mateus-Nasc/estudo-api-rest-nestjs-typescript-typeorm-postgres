import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

declare module 'express' {
  // Extend a interface Request do Express para incluir a propriedade user
  interface Request {
    user?: {
      // role é opcional, pois nem toda requisição pode ter um user
      role?: string;
      [key: string]: any; // permite outras propriedades além de role, como nome, email, etc.
    };
  }
}

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Pegamos a requisição do contexto e acessamos a propriedade user que foi adicionada pelo middleware
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { role?: string } | undefined; // Garantimos que user pode ser undefined e role é opcional

    //se o user existe e tem a propriedade role
    if (user && 'role' in user && user.role === 'admin') {
      return true;
    }

    return false;
  }
}
