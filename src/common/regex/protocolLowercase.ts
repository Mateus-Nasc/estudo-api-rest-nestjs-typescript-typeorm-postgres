import { Protocol } from './protocol.regex';

export class ProtocolLowercase extends Protocol {
  execute(str: string): string {
    return str.toLowerCase();
  }
}
