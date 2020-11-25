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

    // Stub

    getNumMatriculas(): number {
        let total = 0;
        for (let i = 0; i < this.matriculas.length; i++) {
            total++;
        }
        this.numeroMatriculas = total;
        return this.numeroMatriculas;
    }

    getNumAprovados(): number {
        return 0;
    }

    getNumReprovados(): number {
        return 0;
    }

    getMedia(): number {
        let soma = 0.0;
        let total = 0;

        for (let i = 0; i < this.matriculas.length; i++) {
            soma = soma + Number(this.matriculas[i].getMediaGeral());
            total = total + 1;
        }

        return (soma/total);
    }

    getMatricula(cpf: string): Matricula {
        
        for (let i = 0; i < this.matriculas.length; i++) {
            if (this.matriculas[i].aluno.cpf == cpf) {
                return this.matriculas[i];
            }
        }
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