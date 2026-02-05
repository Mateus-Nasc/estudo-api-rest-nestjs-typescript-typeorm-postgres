import { Controller } from '@nestjs/common'; //tirei Get de import
import { AppService } from './app.service';

@Controller() //('home') == /home ; mas por default () == '/'
export class AppController {
  constructor(private readonly appService: AppService) {}
  // this.appService.getHello() fica no return

  //metodo da solicitação; indica que vc quer ler algo in server
  // @Get() //('hello') == /home/hello
  getHello(): string {
    return 'Qualquer coisa';
  }

  // @Get('exemplo')
  exemplo(): string {
    return this.appService.solucionaExemplo();
  }
}
