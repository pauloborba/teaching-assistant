import { Matricula } from './matricula';
import { Roteiro } from './roteiro';
import { Aluno } from './aluno';

export class Turma {
    descricao: string = "";
    metas: string[] = [];
    matriculas: Matricula[] = [];
    roteiros: Roteiro[] = [];
    monitores: Aluno[] = [];
    numeroMatriculas: number = 0;

    constructor() {
      this.descricao = "";
      this.metas = [];
      this.matriculas = [];
      this.roteiros = [];
      this.monitores = [];
      this.numeroMatriculas = 0;
    }

    addRoteiro(roteiro: Roteiro): void {
      this.roteiros.push(roteiro);
    }

    getNumMatriculas(): number {
        return this.numeroMatriculas
    }

    getNumAprovados(): number {
        return 0;
    }

    getNumReprovados(): number {
        return 0;
    }

    getMedia(): number {
        return 0;
    }

    getMatricula(cpf: string): Matricula {
        return null;
    }

    getRoteiros(): Roteiro[] {
        return this.roteiros;
    }

    getMonitores(): Aluno[] {
        return [];
    }

    getPercentual(meta: string, conceito: string): number {
        return 0;
    }
}
