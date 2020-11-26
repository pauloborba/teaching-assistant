import  {Roteiro } from '../common/roteiro'

export class CadastroDeRoteiros{
       roteiros: Roteiro[] = [];

       cadastrarRoteiro (roteiro: Roteiro): Roteiro{
         var result = null;
         if(this.roteiroNaoCadastrado(roteiro.descricao)){
           result = new Roteiro();
           result.copyFrom(roteiro);
           this.roteiros.push(result);
         }
         return result;
       }

       roteiroNaoCadastrado(descricao: string): boolean {
         return !this.roteiros.find(a => a.descricao == descricao);
       }
       removerRoteiro (descricao: String ): void{};

}
