import  { Turma } from '../common/turma'
import { EmailSender } from './EmailSender'

export class NotificacaoNotas {
  emailSender: EmailSender = new EmailSender();

  enviarNotificação(turma: Turma): boolean {
    var porcentagensDeConceitoDasMetas: Map<String,Map<string, number>> = this.gerarPercentsDeMetas(turma);
    var mediaTurma: number = turma.getMedia();
    for(let matricula of turma.matriculas){
      var texto: String = "" ;
      for(let a of matricula.avaliacoes){
        
      }
    
    
    return this.emailSender.enviarEmail(matricula.aluno.email,"", "");
    }
  }

  gerarPercentsDeMetas(turma: Turma): Map<String,Map<string,number>>{
    var metasPercents: Map<String,Map<string,number>>;
    for(let meta of turma.metas){
      var percents: Map<string,number>;
      percents.set("MA", turma.getPercentual(meta,"MA"));
      percents.set("MPA", turma.getPercentual(meta,"MPA"));
      percents.set("MANA", turma.getPercentual(meta,"MANA"));
      metasPercents.set(meta,percents);
    }
    return metasPercents;
  }
   
  }
  
