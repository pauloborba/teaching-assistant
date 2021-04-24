import { Questao } from './questao';

export class BlocoDeQuestoes {
  tipo: string = '';
  questoes: Questao[] = [];

  copyFrom(bloco: BlocoDeQuestoes): void {
    this.tipo = bloco.tipo;
    this.questoes = bloco.questoes.map((q: Questao) => {
      const questao: Questao = new Questao();
      questao.copyFrom(q);
      return questao;
    });
  }
}
