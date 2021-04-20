import { Turma } from '../../../../common/turma';
import { Roteiro } from '../../../../common/roteiro';

export class StubTurmas {
    turmas: Turma[ ] = [ ]

    constructor() {
      this.turmas = [];
      this.init();
    }

    init(){
      var turma = new Turma("2019.1");
      var turma1 = new Turma("2019.2");
      this.turmas.push(turma);
      this.turmas.push(turma1);
    }

    cadastroRoteiro(descricao: string, roteiro: Roteiro): void{
      var result: Turma = this.turmas.find(a => a.descricao == descricao);
      result.addRoteiro(roteiro);
    }

    getTurmas(): string[]{
      var nomes = [];
      for (let index = 0; index < this.turmas.length; index++) {
        nomes.push(this.turmas[index].descricao);
      }
      return nomes;
    }

    getTurma(descricao: string): Turma{
      var turma: Turma = this.turmas.find(a => a.descricao == descricao);
      return turma;
    }

}
