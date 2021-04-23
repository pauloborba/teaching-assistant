import  {Roteiro } from '../../common/roteiro'

export class CadastroDeRoteiros{
       private static roteiros: Roteiro[] = [];

       getRoteiros(): Roteiro[] {
         return CadastroDeRoteiros.roteiros;
       }

       cadastrarRoteiro (roteiro: Roteiro): Roteiro{
         var result = null;
         if(this.roteiroNaoCadastrado(roteiro.descricao)){
           result = new Roteiro();
           result.copyFrom(roteiro);
           CadastroDeRoteiros.roteiros.push(result);
         }
         return result;
       }

       atualizarRoteiro(roteiro: Roteiro): Roteiro{
         var result: Roteiro = CadastroDeRoteiros.roteiros.find(a => a.descricao == roteiro.descricao);
         if (result){
           result.copyFrom(roteiro);
         }
         return result;
       }

       roteiroNaoCadastrado(descricao: string): boolean {
         return !CadastroDeRoteiros.roteiros.find(a => a.descricao == descricao);
       }

       removerRoteiro (descricao: string): string{
         var result: Roteiro = CadastroDeRoteiros.roteiros.find(a => a.descricao == descricao);
         if(result){
           var index = CadastroDeRoteiros.roteiros.indexOf(result);
           CadastroDeRoteiros.roteiros.splice(index, 1);
           return result.descricao;
         } else {
           return null;
         }
       }

}
