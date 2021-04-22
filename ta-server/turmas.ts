import { Aluno } from '../common/aluno';
import { Turma } from '../common/turma';
import { Matricula } from '../common/matricula';
import { Avaliacao } from './avaliacao';

export class Turmas {
    turmas: Turma[] = [];

    cadastrarTurma(turma: Turma): Turma{
        var aux = null;
        aux = new Turma("");
        aux.copyFrom(turma);
        this.turmas.push(aux);
        return aux;
    }

    removerTurma(descricaoTurma: string): Turma{
        var aux:Turma = this.turmas.find(a => a.descricao == descricaoTurma);
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

    compararTurmas(turmas: Turma[]): any {
        return null;
    }

    //tenho que usar o get turmas e procurar a turma
    getTurma(descricao: string): Turma{
        let turma: Turma = this.turmas.find(turma => turma.descricao == descricao);
        return turma;
    }

    getTurmas(){
        return this.turmas;
    }
}
