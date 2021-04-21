import { Aluno } from '../common/aluno';
import { Turma } from '../common/turma';
import { Matricula } from '../common/matricula';
import { Avaliacao } from './avaliacao';

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
    
    getResumos(descricoes: string[]): any[] {
        let resumos: any[] = [];
        descricoes.forEach(descricao => {
            const turma = this.getTurma(descricao);
            if (turma) {
                const media = turma.getMedia();
                const reprovacao = turma.getNumReprovados() / turma.getNumMatriculas();
                resumos.push({ descricao, media, reprovacao });
            }
        });

        return resumos;
    }

    getTurma(descricao: string): Turma{
        var result: Turma = this.turmas.find(a => a.descricao == descricao);
        return result;
    }
}
