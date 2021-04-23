
import { Turma } from '../common/turma';
import { Avaliacao } from './avaliacao';

export class ImportacaoDeNotas{
   cheatcpfs: string[] = []
  
  importar(turma: Turma,notas:Avaliacao[][]): boolean{
    let matriculas = turma.getMatriculas();
    let ok:boolean = false;
    for (let a = 0; a < this.cheatcpfs.length; a++) {
      const curAluno = this.cheatcpfs[a];
      if(turma.atualizaravaliacoes(curAluno,notas[a])){
        ok = true;
      }
      else
        return false;
    }
    return ok;
  }
  
  metaGroup(planilha:any){
    let cpfs = []
    let geral: Avaliacao[][] = []
    for(let f=0;f<planilha.length;f++){
      let alunonota:any = planilha[f];
      let avaliacoes: Avaliacao[] = [];
      for(var k in alunonota){
        if(k == "cpf"){
          cpfs.push(alunonota[k])
        }
        else{
          let aval = new Avaliacao();
          aval.setMeta(k);
          aval.setNota(alunonota[k])
          avaliacoes.push(aval);
        }
      }
      geral.push(avaliacoes);
    }
    this.cheatcpfs = cpfs 
    return geral;
 }
}   
