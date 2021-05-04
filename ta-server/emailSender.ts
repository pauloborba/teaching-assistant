import { Matricula } from "../common/matricula";
import { Matriculas } from '../ta-server/repos/matriculas';

export class EmailSender {

  filterAllInformations(matriculas: Matricula[], descricao: string) {
    const matriculasRepo: Matriculas = new Matriculas();
    matriculas.forEach(x => {
      let matricula = matriculasRepo.getMatricula(x.aluno.cpf);
      this.enviarEmail(x.aluno.email, `resultado final na disciplina ${descricao}`, `Prezado(a) ${x.aluno.nome}, segue abaixo o seu resultado final na disciplina:
     ${matricula.aprovado() ? 'aprovado': 'reprovado'}, sua media foi de ${matricula.media()}`)
    })
    
  }

  enviarEmail(to: string, subject: string, message: string, from: string = 'teaching-assitant@ta.host'): boolean {
    console.log(
        '--- Mensagem de email ---\n' +
        'De: <' + from + '>\n' +
        'Para: <' + to + '>\n' +
        'Assunto: ' + subject + '\n' +
        message + '\n' +
        '-------------------------\n');
    return true;
  }

}
