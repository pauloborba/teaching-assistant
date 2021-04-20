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

       atualizarRoteiro(roteiro: Roteiro): Roteiro{
         var result: Roteiro = this.roteiros.find(a => a.descricao == roteiro.descricao);
         if (result){
           result.copyFrom(roteiro);
         }
         return result;
       }

       roteiroNaoCadastrado(descricao: string): boolean {
         return !this.roteiros.find(a => a.descricao == descricao);
       }

       removerRoteiro (descricao: string): string{
         var result: Roteiro = this.roteiros.find(a => a.descricao == descricao);
         if(result){
           var index = this.roteiros.indexOf(result);
           this.roteiros.splice(index, 1);
           return result.descricao;
         } else {
           return null;
         }
       }

       getRoteiros(): Roteiro[]{
         return this.roteiros;
       }

}
