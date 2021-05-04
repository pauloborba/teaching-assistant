import { Aluno } from './aluno';
import { Avaliacao } from './avaliacao';
import { Turma } from './turma';

export class AtualizacaoNotas {
  aluno: Aluno;
  turma: Turma;
  avaliacoes: Avaliacao[] = [];
  dataHora: Date;
  enviada: boolean = false;
  erroEnvio: string = '';

  copyFrom(from: AtualizacaoNotas): void {
    this.aluno = from.aluno;
    this.turma = from.turma;
    this.dataHora = from.dataHora;
    this.enviada = from.enviada;
    this.erroEnvio = from.erroEnvio;

    from.avaliacoes.forEach((a: Avaliacao) => {
      const avaliacao: Avaliacao = this.avaliacoes.find(v => v.meta === a.meta);

      if (avaliacao) {
        avaliacao.nota = a.nota;
      } else {
        this.avaliacoes.push(a);
      }
    });
  }
}
