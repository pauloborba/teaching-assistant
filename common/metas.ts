export class Metas {
    meta: String [] = [];
    peso: String = '';
  
    copyFrom(from: Metas): void {
      this.meta = from.meta;
      this.peso = from.peso;
    }
  }
  