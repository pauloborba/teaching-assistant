import { Questao} from './questao'

export class BlocoDeQuestoes{
    tipo: string;
    questoes : Questao[];

    getQuestoes(): Questao[]{
        return this.questoes;
    }

    constructor() {
      this.tipo = "";
      this.questoes = [];
    }

}
