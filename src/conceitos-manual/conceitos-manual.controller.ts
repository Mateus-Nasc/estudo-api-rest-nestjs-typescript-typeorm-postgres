import { Controller, Get } from '@nestjs/common';
import { ConceitosManualService } from './conceitos-manual.service';

@Controller('conceitos-manual')
export class ConceitosManualController {
  constructor(
    //o module só consegue acessar o service se ele estiver em providers no module.ts
    private readonly conceitosManualService: ConceitosManualService,
  ) {} //injetando a dependencia

  @Get()
  home(): string {
    return this.conceitosManualService.solucionaHome(); //usando service dentro do metodo
  }
}
