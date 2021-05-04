import { Aluno } from './aluno';
import { Avaliacao } from './avaliacao';
import { RespostaDeRoteiro } from './respostaDeRoteiro';

export class Matricula {
  aluno: Aluno;
  avaliacoes: Avaliacao[] = [];
  autoAvaliacoes: Avaliacao[] = [];
  monitor: Aluno;
  respostasDeRoteiros: RespostaDeRoteiro[] = [];
  _media: number = 0;
  _reprovouPorFalta: boolean = false;

  get aprovado(): boolean {
    return this._media >= 5;
  }

  copyFrom(from: Matricula): void {
    this.aluno = from.aluno;
    this.avaliacoes = from.avaliacoes;
    this.autoAvaliacoes = from.autoAvaliacoes;
    this.monitor = from.monitor;
    this.respostasDeRoteiros = from.respostasDeRoteiros;
    this._media = from._media;
    this._reprovouPorFalta = from._reprovouPorFalta;
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

  get reprovadoPorFalta(){
    return this._reprovouPorFalta;
  }

  set reprovadoPorFalta(value: boolean){
    this._reprovouPorFalta = value;
  }

  get media(): number {
    return this._media;
  }

  set media(value: number){
      this._media = value;
  }
}
