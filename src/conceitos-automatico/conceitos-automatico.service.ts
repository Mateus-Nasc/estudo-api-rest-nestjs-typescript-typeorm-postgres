import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  solucionaAut(): string {
    return 'Home do Conceitos Automatico Solucionada';
  }
}
