import { Turma } from '../common/turma';

export class Turmas {
    turmas: Turma[] = [];
    
    constructor(){ 
      
       
    }

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
        const turma = this.turmas.find(t => t.descricao === descricao)
        return turma;
    }

    getTurmas(): Turma[]{
        return this.turmas;
    }

    getDescricoes(): string[]{
        const descricoes = this.turmas.map(turma => turma.descricao);
        return descricoes;
    }

} 