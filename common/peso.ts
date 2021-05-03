  export class Peso {
    peso: String = '';
  
    copyFrom(from: Peso): void {
      this.peso = from.peso;
    }
  }
  