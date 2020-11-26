import { Aluno } from '../common/aluno';
import { Turma } from '../common/turma';

export class Turmas {
    turmas: Turma[ ] = [ ]


    cadastrarTurma(turma: Turma): Turma{
        var aux = null;
        aux = new Turma();
        aux.copyFrom(turma);
        this.turmas.push(aux);
        return aux;
    }

    removerTurma(turma: Turma): Turma{
        var aux:Turma = this.turmas.find(a => a.descricao == turma.descricao);
        return  aux;
    }

    atualizarTurma(turma: Turma): Turma{
        var aux:Turma = this.turmas.find(a => a.descricao == turma.descricao);
        if(aux) aux.copyFrom(turma)
        return aux;
    }
    
    compararTurmas(turmas: Turma []): any{
        return null;
    }

    getTurma(descricao: string): Turma{
        var result: Turma = this.turmas.find(a => a.descricao == descricao);
        return result;
    }
}