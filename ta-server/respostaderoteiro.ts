import { Roteiro } from "./roteiro";
import { RespostaDeQuestao } from "./respostadequestao"

export class RespostaDeRoteiro {
    nota: String;
    roteiro: Roteiro
    respostasDeQuestoes: RespostaDeQuestao[] = []

    getNota(): String{
        return this.nota
    }

    getRoteiro(): Roteiro{return;}
    getRespostasDeQuestoes(): RespostaDeQuestao[]{return [];}
}