import { Matricula } from './matricula';
import { Roteiro } from './roteiro';
import { Aluno } from './aluno';
import { Avaliacao } from '../ta-server/avaliacao';

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
    
    constructor(desc: string) {
      this.descricao = desc;
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

    getAgendamentoRoteiros(): Roteiro[] {
        return [];
    }

    getRoteiros(): Roteiro[] {
        return this.roteiros;
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
      
	// addAgendamento(ar: AgendamentoRoteiro){
	// 	agendamentos.push(ar);
	// }

    addMetas(metasClonadas: string[]){
        this.metas = this.metas.concat(metasClonadas);
    }

    getMetas(): string[]{
        return this.metas;
    }
}