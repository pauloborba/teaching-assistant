import { BlocoDeQuestoes } from './blocoDeQuestoes';

export class Roteiro {
  descricao: string;
  blocos: BlocoDeQuestoes[] = [];

  constructor() {
    this.descricao = '';
    this.blocos = [];
  }

  copyFrom(from: Roteiro): void {
    this.descricao = from.descricao;
    this.blocos = from.blocos.map((b: BlocoDeQuestoes) => {
      const bloco: BlocoDeQuestoes = new BlocoDeQuestoes();
      bloco.copyFrom(b);
      return b;
    });
  }
}
