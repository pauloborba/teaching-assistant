import { Aluno } from './aluno';
import { Avaliacao } from './avaliacao';
import { RespostaDeRoteiro } from './respostaDeRoteiro';

export class Matricula {
  aluno: Aluno;
  avaliacoes: Avaliacao[] = [];
  autoAvaliacoes: Avaliacao[] = [];
  monitor: Aluno;
  respostasDeRoteiros: RespostaDeRoteiro[] = [];

  aprovado(): boolean {
    let media = this.media();
    return media >= 7? true : false;
  }

  copyFrom(from: Matricula): void {
    this.aluno = from.aluno;
    this.avaliacoes = from.avaliacoes;
    this.autoAvaliacoes = from.autoAvaliacoes;
    this.monitor = from.monitor;
    this.respostasDeRoteiros = from.respostasDeRoteiros;
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

  media(): number {
    let notas = 0;
    this.avaliacoes.forEach(x =>  notas += parseInt(x.nota))
    notas /= this.avaliacoes.length;
    return notas; 
  }
}
