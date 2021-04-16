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
    
    getResumos(descricoes: string[]): any[] {
        let resumos: any[] = [];
        descricoes.forEach(descricao => {
            const turma = this.getTurma(descricao);
            const media = turma.getMedia();
            const reprovacao = turma.getNumReprovados() / turma.getNumMatriculas();
            resumos.push({ descricao, media, reprovacao });
        });

        return resumos;
    }

    getTurma(descricao: string): Turma{
      var result: Turma = this.turmas.find(a => a.descricao == descricao);
        return result;
    }
}
