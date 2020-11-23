import { Turma } from '../common/turma';

export class Turmas {
    turmas: Turma[] = [];
    
    constructor(){
        // var turmaTurminha = new Turma();
        // turmaTurminha.descricao = "batata"
        // turmaTurminha.metas = ["meta1", 'meta2', 'metA3'];
        // this.turmas.push(turmaTurminha);
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
        //const descricoes = this.turmas.map(turma => turma.descricao);
        const descricoes = ["teste1", "vector", "maryzinha", "elaine", "mozao", "caronas"];
        return descricoes;
    }
} 