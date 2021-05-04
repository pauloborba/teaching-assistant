import { BlocoDeQuestoes } from "../ta-server/blocodequestoes"

export class Roteiro {
    descricao: string;
    blocos: BlocoDeQuestoes[] = [];

  constructor() {
    this.clean();
  }

  clean(): void {
    this.descricao = "";
    this.blocos = [];
  }

  copyFrom(from: Roteiro): void {
      this.descricao = from.descricao;
      this.blocos = from.blocos;
    }
  
    equals(b: Roteiro) : boolean{
      return this.descricao==b.descricao;
    }
}
