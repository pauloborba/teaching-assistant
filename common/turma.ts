import { Matricula } from './matricula';
import { AgendamentoRoteiro } from './AgendamentoRoteiro';
import { Aluno } from './aluno';
import { Avaliacao } from '../ta-server/avaliacao';

export class Turma {
    descricao: string = "";
    metas: string[] = [];
    matriculas: Matricula[] = [];
    agendamentos: AgendamentoRoteiro[] = [];
    monitores: Aluno[] = [];
    numeroMatriculas: number = 0;

    copyFrom(from:Turma): void{
        this.descricao = from.descricao;
        this.metas = from.metas;
        this.matriculas = from.matriculas;
        this.agendamentos = from.agendamentos;
        this.monitores = from.monitores;
        this.numeroMatriculas = from.numeroMatriculas;
    }
	
    constructor(desc = "") {
      this.descricao = desc;
      this.metas = [];
      this.matriculas = [];
      this.agendamentos = [];
      this.monitores = [];
      this.numeroMatriculas = 0;
    }

    addAgendamento(agendamento: AgendamentoRoteiro): void {
      this.agendamentos.push(agendamento);
    }

    getNumMatriculas(): number {
        return this.numeroMatriculas;
	}

    getNumAprovados(): number{
        return 0;
    }

    getNumReprovados(): number{
        return 0;
    }

    getMedia(): number {
        return 7;
    }
   
    getMatricula(cpf:string): Matricula{ 
        let matricula: Matricula = this.matriculas.find(matricula => matricula.getAluno().cpf == cpf);
        return matricula;
    }

    getMatriculas(): Matricula [] {
        return this.matriculas;
    }

    getAgendamentosRoteiro(): AgendamentoRoteiro[] {
        return this.agendamentos;
	}

    getDescricao(): string{
        return this.descricao;
    }

    getMonitores(): Aluno[] {

        return [];
    }

    getPercentual(meta: string, conceito: string): number{
        return 0;
    }
	
    addMetas(metasClonadas: string[]){
        this.metas = this.metas.concat(metasClonadas);
    }

    getMetas(): string[]{
        return this.metas;
    }
}