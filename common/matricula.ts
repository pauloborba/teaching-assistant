import { Aluno } from "./aluno"
import { Avaliacao } from "../ta-server/avaliacao"
import { RespostaDeRoteiro } from "../ta-server/respostaderoteiro"

export class Matricula{
    aluno: Aluno;
    avaliacoes: Avaliacao[] = [];
    autoAvaliacoes: Avaliacao[] = [];
    monitor: Aluno;
    respostasDeRoteiros: RespostaDeRoteiro[] = [];
    
    getAluno(): Aluno{
        return this.aluno;
    }
    getAvaliacoes(): Avaliacao[]{
        return this.avaliacoes;
    }
    getAutoAvaliacoes(): Avaliacao[]{
        return this.autoAvaliacoes;
    }
    getMonitor(): Aluno {
        return this.monitor;      
    }

    getRespostasDeRoteiros(): RespostaDeRoteiro[]{
        return this.respostasDeRoteiros;
    }

    atualizarAvaliacoes(avaliacoes: Avaliacao[]): boolean{
        let ok:boolean = true;

        for(let a = 0; a < avaliacoes.length; a++) {
            const metaCheck = this.metaCheck(avaliacoes[a]);
            
            if(metaCheck != -1){
                //metaCheck.setNota(avaliacoes[a].nota);
                this.avaliacoes[metaCheck].setNota(avaliacoes[a].nota)
            }
            else{
                ok = false;
            }
        }
        return ok;
    }

    metaCheck(avaliacao:Avaliacao){
        return this.avaliacoes.findIndex(av => av.meta == avaliacao.meta);
    }

    atualizarAutoAvaliacoes(autoAvaliacoesAtualizadas: Avaliacao[]): Avaliacao[] {
        autoAvaliacoesAtualizadas.map((avaliacao) => {
            const metaExistente = this.autoAvaliacoes.find(av => av.meta == avaliacao.meta);
            if(metaExistente){
                metaExistente.setNota(avaliacao.nota);
            }
            else{
                const av = new Avaliacao();
                av.setMeta(avaliacao.meta);
                av.setNota(avaliacao.nota);
                this.autoAvaliacoes.push(av);
            }
        })
        return this.autoAvaliacoes;
    }

  getMedia(): number{
        return 0;
   }
}