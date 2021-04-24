import { Aluno } from './aluno';
import { Avaliacao } from './avaliacao';
import { RespostaDeRoteiro } from './respostaDeRoteiro';

export class Matricula {
  aluno: Aluno;
  avaliacoes: Avaliacao[] = [];
  autoAvaliacoes: Avaliacao[] = [];
  monitor: Aluno;
  respostasDeRoteiros: RespostaDeRoteiro[] = [];

  get aprovado(): boolean {
    return false; /* TODO */
  }

  atualizarAutoAvaliacoes(autoAvaliacoesAtualizadas: Avaliacao[]): Avaliacao[] {
    autoAvaliacoesAtualizadas.map((avaliacao) => {
      const metaExistente = this.autoAvaliacoes.find(av => av.meta == avaliacao.meta);
      if (metaExistente) {
        metaExistente.nota = avaliacao.nota;
      } else {
        const av = new Avaliacao();
        av.nota = avaliacao.meta;
        av.nota = avaliacao.nota;
        this.autoAvaliacoes.push(av);
      }
    });
    return this.autoAvaliacoes;
  }

  get media(): number {
    return 0; /* TODO */
  }
}
