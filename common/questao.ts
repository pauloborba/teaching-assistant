export class Questao {
  pergunta: string = '';
  dica: string = '';

  copyFrom(questao: Questao): void {
    this.pergunta = questao.pergunta;
    this.dica = questao.dica;
  }
}
