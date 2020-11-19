import { Questao } from "./questao";

export class RespostaDeQuestao{
    questao: Questao;
    resposta: String;
    nota: String;
    correcao: String;
    duracao: number;

    getQuestao(): Questao{return;}
    getResposta(): String{return;}
    getNota(): String{return;}
    getCorrecao(): String{return;}
    getDuracao(): number{return;}
}