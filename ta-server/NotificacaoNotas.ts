import { Turma } from '../common/turma'
import { EmailSender } from './EmailSender'
import { Matricula } from '../common/matricula'

export class NotificacaoNotas {
  emailSender: EmailSender = new EmailSender();

  enviarNotificação(turma: Turma): boolean {
    var porcentagensDeConceitoDasMetasMap: Map<String, Map<string, number>> = this.gerarPercentsDeMetas(turma);
    var porcentagensTextMap : Map<String,String> = this.porcentagensDeConceitosText(porcentagensDeConceitoDasMetasMap, turma);
    var mediaTurma: number = turma.getMedia();
    for (let matricula of turma.matriculas) {
      var texto: string = this.conceitosDasMetasDoAluno(matricula) + this.ressaltarDiferencas(matricula, porcentagensDeConceitoDasMetasMap);
      


      return this.emailSender.enviarEmail(matricula.aluno.email, "", texto);
    }
  }

  ressaltarDiferencas(matricula: Matricula, porcentagensDeConceitoDasMetas: Map<String, Map<string, number>>): string {
    var texto:string = "" ;
    for (let aval of matricula.avaliacoes) {
      
    }
    return ""
  }
  porcentagensDeConceitosText(porcentagens: Map<String,Map<string,number>>, turma:Turma): Map<String,String>{
    var metaPorcentagensMap: Map<String,String>
    for(let meta of turma.metas){
      
      let percentsText: String = 
       "MA - " + porcentagens.get(meta).get("MA") + ", "
        + "MPA - " + porcentagens.get(meta).get("MPA") + ", "
        +  "MANA : " + porcentagens.get(meta).get("MA") + "\n \n"
        metaPorcentagensMap.set(meta,percentsText);
    }
return null;
  }

  gerarPercentsDeMetas(turma: Turma): Map<String, Map<string, number>> {
    var metasPercents: Map<String, Map<string, number>>;
    for (let meta of turma.metas) {
      var percents: Map<string, number>;
      percents.set("MA", turma.getPercentual(meta, "MA"));
      percents.set("MPA", turma.getPercentual(meta, "MPA"));
      percents.set("MANA", turma.getPercentual(meta, "MANA"));
      metasPercents.set(meta, percents);
    }
    return metasPercents;
  }

  //Texto que diz qual conceito o aluno tirou em cada meta {{stub}}
  conceitosDasMetasDoAluno(matricula: Matricula): string {
    
    return "";
  }

}

