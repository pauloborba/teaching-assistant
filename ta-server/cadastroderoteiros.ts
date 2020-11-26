import  {Roteiro } from '../common/roteiro'

export class CadastroDeRoteiros{
       roteiros: Roteiro[] = [];

       cadastrarRoteiro (roteiro: Roteiro): Roteiro{
          var result = new Roteiro();
          result.copyFrom(roteiro);
          this.roteiros.push(result);
          return result;
       }

       removerRoteiro (descricao: String ): void{};

}
