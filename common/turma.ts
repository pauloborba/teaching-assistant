import { Matricula } from './matricula';
import { Roteiro } from '../ta-server/roteiro';
import { Aluno } from './aluno';

export class Turma {
    descricao: string = "";
    metas: string[] = [];
    matriculas: Matricula[] = [];
    roteiros: Roteiro[] = [];
    monitores: Aluno[] = [];
    numeroMatriculas: number = 0;


    copyFrom(from:Turma): void{
        this.descricao = from.descricao;
        this.metas = from.metas;
        this.matriculas = from.matriculas;
        this.roteiros = from.roteiros;
        this.monitores = from.monitores;
        this.numeroMatriculas = from.numeroMatriculas;
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
        return [];
    }

    getMonitores(): Aluno[] {
    
        return [];
    }

    getPercentual(meta: string, conceito: string): number {
        return 0;
    }
}