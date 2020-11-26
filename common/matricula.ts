import { Aluno } from "./aluno"
import { Avaliacao } from "../ta-server/avaliacao"
import { RespostaDeRoteiro } from "../ta-server/respostaderoteiro"

export class Matricula{
    aluno: Aluno
    avaliacoes: Avaliacao[] = []
    autoAvaliacoes: Avaliacao[] = []
    monitor: Aluno
    respostasDeRoteiros: RespostaDeRoteiro[] = []
    
    getAluno(): Aluno{
        return this.aluno
    }
    getAvaliacoes(): Avaliacao[]{
        return this.avaliacoes
    }
    getAutoAvaliacoes(): Avaliacao[]{
        return this.autoAvaliacoes
    }
    getMonitor(): Aluno {
        return this.monitor      
    }
    getRespostasDeRoteiros(): RespostaDeRoteiro[]{
        return this.respostasDeRoteiros
    }
    getMediaGeral(): Number {
        let somatorio = 0;
        let total = 0;
        for (let i = 0; i < this.avaliacoes.length; i++) {
            somatorio = somatorio + Number(this.avaliacoes[i].getNota());
            total = total + 1;
        }
        return (somatorio/total);
    }
    reprovacoesAnteriores(cpfAluno: String): Boolean {

        let matriculas = this.aluno.getMatriculas();

        for (let i = 0; i < matriculas.length; i++) {
            for (let j = 0; j < matriculas.length; j++) {
                if (i == j) {
                    break;
                }
                else if (this.aluno.matriculas[i] == this.aluno.matriculas[j]) {
                    return true;
                }
            }
        }

        return false;
    }
}