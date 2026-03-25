import { Protocol } from './protocol.regex';

export class RemoveSpaces extends Protocol {
  execute(str: string): string {
    return str.trim();
  }
}
