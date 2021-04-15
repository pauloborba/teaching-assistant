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

    constructor(descricao: string) {
        this.descricao = descricao;
    }

    getNumMatriculas(): number {
        switch (this.descricao) {
            case '2017.2':
                return 40;
            case '2018.1':
                return 50;
            case '2018.2':
                return 40;
            case '2019.1':
                return 40;
            case '2019.2':
                return 50;
            default:
                return 50;
        }
    }
    
    getNumAprovados(): number {
        return 0;
    }
    
    getNumReprovados(): number {
        switch (this.descricao) {
            case '2017.2':
                return 12;
            case '2018.1':
                return 10;
            case '2018.2':
                return 6;
            case '2019.1':
                return 4;
            case '2019.2':
                return 5;
            default:
                return 6;
        }
    }

    getMedia(): number {
        switch (this.descricao) {
            case '2017.2':
                return 6.7;
            case '2018.1':
                return 7.3;
            case '2018.2':
                return 7.1;
            case '2019.1':
                return 6.8;
            case '2019.2':
                return 7.8;
            default:
                return 8;
        }
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