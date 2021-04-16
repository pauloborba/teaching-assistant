import { Matricula } from './matricula';
import { Matricula } from './agendamentoRoteiro';
import { Aluno } from './aluno';

export class Turma {
    descricao: string = "";
    metas: string[] = [];
    matriculas: Matricula[] = [];
    agendamentos: AgendamentoRoteiro[] = [];
    monitores: Aluno[] = [];
    numeroMatriculas: number = 0;

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

    getAgendamentoRoteiros(): Roteiro[] {
        return [];
    }

    getMonitores(): Aluno[] {
        return [];
    }

    getPercentual(meta: string, conceito: string): number {
        return 0;
    }
	addAgendamento(ar: AgendamentoRoteiro){
		agendamentos.push(ar);
	}
}