import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosUtils {
  invertirString(str: string) {
    return str.split('').reverse().join(''); //exemplo de método utilitário para inverter uma string
  }
}

@Injectable()
export class RecadosUtilsMock {
  //essa classe mockada me permite testar a class RecadosUtils sem precisar da implementação real, que pode ser mais complexa ou depender de outras coisas
  invertirString() {
    return 'utilizando Mock';
  }
}
