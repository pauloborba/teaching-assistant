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
        return null;
    }

    getTurmas(): Turma[]{
        return null;
    }

    getDescricoes(): string[]{
        const descricoes = this.turmas.map(turma => turma.descricao);
        //const descricoes = ["teste1", "vector", "maryzinha", "elaine", "mozao", "caronas"];
        return descricoes;
    }
} 