import { Turma } from '../common/turma';

export class Turmas {
    turmas: Turma[ ] = [ ]


    cadastrarTurma(turma: Turma): Turma{
        return null;
    }

    removerTurma(descricao: string): Turma{
        return null;
    }

    atualizarTurma(turma: Turma): Turma{
        return null;
    }
    
    compararTurmas(turmas: Turma []): any{
        return null;
    }

    getTurma(descricao: string): Turma{
        var result: Turma = this.turmas.find(a => a.descricao == descricao);
        return result;
    }
}