import { Matricula } from './matricula';
import { Roteiro } from './roteiro';
import { Aluno } from './aluno';
import { Peso } from './peso';

export class Turma {
  descricao: string;
  metas: string[];
  //metas: Metas[]=[];
  peso: number[];
  vagas: number;
  matriculas: Matricula[];
  roteiros: Roteiro[];
  monitores: Aluno[];

  constructor() {
    this.descricao = '';
    this.vagas = 0;
    this.metas = [];
    this.peso = [];
    this.matriculas = [];
    this.roteiros = [];
    this.monitores = [];
  }

  copyFrom(from: Turma): void {
    this.descricao = from.descricao;
    this.vagas = from.vagas;
    this.metas = from.metas;
   this.peso = from.peso;
    this.matriculas = from.matriculas;
    this.roteiros = from.roteiros;
    this.monitores = from.monitores;
  }

  get numMatriculas(): number {
    return this.matriculas.length;
  }

  get numAprovados(): number {
    let numAprovados = 0;

    this.matriculas.forEach((matricula: Matricula) => {
      if (matricula.aprovado)
        ++numAprovados;
    });

    return numAprovados;
  }

  get numReprovados(): number {
    return this.numMatriculas - this.numAprovados;
  }

  get media(): number {
    if (this.numMatriculas > 0) {
      let totalMedias = 0;

      this.matriculas.forEach((matricula: Matricula) => {
        totalMedias += matricula.media;
      });

      return totalMedias / this.numMatriculas;
    }

    return 0;
  }

  getMatricula(cpf: string): Matricula {
    return this.matriculas.find(matricula => matricula.aluno.cpf === cpf);
  }

  getPercentual(meta: string, conceito: string): number {
    return 0; /* TODO */
  }
}
