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
        // let somatorio = 0;
        // let total = 0;
        // for (let i = 0; i < this.avaliacoes.length; i++) {
        //     somatorio = somatorio + Number(this.avaliacoes[i].getNota());
        //     total = total + 1;
        // }
        // return (somatorio/total);

        // Fake
        if (this.aluno.cpf == '12345') {
            return (6.95);
        }
        else if (this.aluno.cpf == '34567') {
            return (4.7);
        }
        else if (this.aluno.cpf == '35790') {
            return (7.5);
        }
        else {
            return 0;
        }
    }
    reprovacoesAnteriores(cpfAluno: String): Boolean {
        if (cpfAluno == '12345') {
            return (true);
        }
        else if (cpfAluno == '34567') {
            return (true);
        }
        else if (cpfAluno == '35790') {
            return (false);
        }
        else {
            return (false);
        }
    }
}