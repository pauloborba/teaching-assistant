import { Matricula } from './matricula';
import { Roteiro } from '../ta-server/roteiro';
import { Aluno } from './aluno';
import { Avaliacao } from '../ta-server/avaliacao';

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

    ngOnInit() {
        this.descricao = "";
        this.metas = [];
        this.matriculas = [];
        this.roteiros = [];
        this.monitores = [];
        this.numeroMatriculas = 0;
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

    getMatriculas(): Matricula[]{
        return this.matriculas;
    }
}
