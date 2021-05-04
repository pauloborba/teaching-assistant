import { Turma } from '../common/turma'
import { EmailSender } from './emailSender'
import { Matricula } from '../common/matricula'
import * as nodemailer from "nodemailer";

export class NotificacaoNotas {
  emailSender: EmailSender = new EmailSender();

  enviarNotificacao(turma: Turma): string {
    let smtpConfig = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'tyrell.reilly60@ethereal.email',
          pass: 'CrGDjzUMddCXHbNN5f'
      }
  });

    if(turma.descricao===undefined || turma.descricao===null || turma.descricao==="" ){
      return null;
    }
    var porcentagensDeConceitoDasMetasMap: Map<String, Map<string, number>> = this.gerarPercentsDeMetas(turma);
    var porcentagensTextMap: Map<String, String> = this.porcentagensDeConceitosText(porcentagensDeConceitoDasMetasMap, turma);
    var mediaTurma: number = turma.media;
    for (let matricula of turma.matriculas) {
      var texto: string = /*this.conceitosDasMetasDoAluno(matricula) +*/ this.ressaltarDiferencasMetas(matricula, porcentagensTextMap) + 
      this.ressaltarDiferencaMedia(matricula,mediaTurma);

      console.log("Enviando email para : " + matricula.aluno.email )
      if(this.emailSender.enviarEmail(matricula.aluno.email, "", texto, smtpConfig) == false){
        return null;
      }
    }
    return "Turma notificada!";
  }

  ressaltarDiferencasMetas(matricula: Matricula, porcentagensTextMap: Map<String, String>): string {
    var texto: string = "";
    for (let aval of matricula.avaliacoes) {
      texto =
        "Para a meta: " + aval.meta +
        "Você: " + aval.nota +
        "\n Turma: " + porcentagensTextMap.get(aval.meta);
    }
    return texto;
  }
  ressaltarDiferencaMedia(matricula: Matricula, mediaTurma: number ) : string{
    var texto: string ="" ;
    texto = "Sua média: " + matricula.media + " \n" +
    "Média da turma: " + mediaTurma;
    return texto;
  }
  porcentagensDeConceitosText(porcentagens: Map<String, Map<string, number>>, turma: Turma): Map<String, String> {
    var metaPorcentagensMap: Map<String, String>
    for (let meta of turma.metas) {

      let percentsText: String =
        "MA - " + porcentagens.get(meta).get("MA") + ", " +
        "MPA - " + porcentagens.get(meta).get("MPA") + ", " +
        "MANA - " + porcentagens.get(meta).get("MA") + "\n \n"
      metaPorcentagensMap.set(meta, percentsText);
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
