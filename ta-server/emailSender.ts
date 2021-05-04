import { Matricula } from "../common/matricula";
import { Matriculas } from '../ta-server/repos/matriculas';
import * as nodemailer from "nodemailer";

export class EmailSender {
 
  filterAllInformations(matriculas: Matricula[], descricao: string) : boolean[] {
    
    const matriculasRepo: Matriculas = new Matriculas();

    let smtpConfig = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'tyrell.reilly60@ethereal.email',
          pass: 'CrGDjzUMddCXHbNN5f'
      }
    });

    let sentEmails: boolean[] = [];

    matriculas.forEach(x => {
      let matricula = matriculasRepo.getMatricula(x.aluno.cpf);
      console.log(matricula.media());
      
      if(isNaN(matricula.media())){
        return sentEmails = [false];
      }

      const email = x.aluno.email;
      const assunto = `resultado final na disciplina ${descricao}`;
      const mensagem = `Prezado(a) ${x.aluno.nome}, segue abaixo o seu resultado final na disciplina:
      ${matricula.aprovado() ? 'aprovado(a)': 'reprovado(a)'}, sua media foi de ${matricula.media()}`;
      sentEmails.push(this.enviarEmail(email, assunto, mensagem, smtpConfig));
    });
    return sentEmails;
  }

  enviarEmail(to: string, subject: string, message: string, smpt:any): boolean {
    
    let emailMessage = {
      from: "tyrell.reilly60@ethereal.email",
      to: to,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`
    };
      
    smpt.sendMail(emailMessage, (err:any, info:any) => {
      if (err) {
        return false;
      }
    });

    return true;
  }

}
