import { Turma } from '../common/turma';

export class Turmas {
    turmas: Turma[] = []


    cadastrarTurma(turma: Turma): Turma{
        return;
    }

    removerTurma(descricao: string): Turma{
        return;
    }

    atualizarTurma(turma: Turma): Turma{
        return;
    }
    
    compararTurmas(turmas: Turma []): any{
        return;
    }

    getTurma(descricao: string): Turma{
        let turma: Turma = this.turmas.find(turma => turma.descricao == descricao);
        return turma;
    }

    getTurmas(){
        return this.turmas;
    }
}