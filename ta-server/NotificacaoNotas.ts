import { Turma } from '../common/turma'
import { EmailSender } from './EmailSender'
import { Matricula } from '../common/matricula'

export class NotificacaoNotas {
  emailSender: EmailSender = new EmailSender();

  enviarNotificação(turma: Turma): boolean {
    var porcentagensDeConceitoDasMetas: Map<String, Map<string, number>> = this.gerarPercentsDeMetas(turma);
    var mediaTurma: number = turma.getMedia();
    for (let matricula of turma.matriculas) {
      var texto: string = this.conceitoDasMetas(matricula) + this.ressaltarDiferencas(matricula, porcentagensDeConceitoDasMetas);
      


      return this.emailSender.enviarEmail(matricula.aluno.email, "", texto);
    }
  }

  ressaltarDiferencas(matricula: Matricula, porcentagensDeConceitoDasMetas: Map<String, Map<string, number>>): string {
    var texto:string = "" ;
    for (let a of matricula.avaliacoes) {
      texto += " Para a meta: '" + a.meta + "' seu conceito foi: " + a.nota + "\n"
        + "Turma: " 
        + "MA - " + porcentagensDeConceitoDasMetas.get(a.meta).get("MA") + ", "
        + "MPA - " + porcentagensDeConceitoDasMetas.get(a.meta).get("MPA") + ", "
        +  "MANA : " + porcentagensDeConceitoDasMetas.get(a.meta).get("MA") + "\n \n"
    }
    return ""
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
  conceitoDasMetas(matricula: Matricula): string {
    
    return "";
  }

}

