import { Turma } from '../common/turma'
import { EmailSender } from './EmailSender'
import { Matricula } from '../common/matricula'

// Interface para criar um array de alunos notificados
interface StatusNotificacao {
  nome: String;
  cpf: String;
  notificado: boolean;
}

export class NotificacaoNotas {
  emailSender: EmailSender = new EmailSender();

  enviarNotificação(turma: Turma): StatusNotificacao[] {
    console.log(turma)
    if (turma.descricao === undefined || turma.descricao === null || turma.descricao === "") {
      return null;
    }
    var porcentagensDeConceitoDasMetasMap: Map<String, Map<string, number>> = this.gerarPercentsDeMetas(turma);
    var porcentagensTextMap: Map<String, String> = this.porcentagensDeConceitosText(porcentagensDeConceitoDasMetasMap, turma);
    var mediaTurma: number = turma.getMedia();
    let statusNotificacao = new Array<StatusNotificacao>() // Cria array para gerir alunos notificados
    console.log(typeof statusNotificacao)
    for (let matricula of turma.matriculas) {
      var texto: string = /*this.conceitosDasMetasDoAluno(matricula) +*/ this.ressaltarDiferencasMetas(matricula, porcentagensTextMap) +
        this.ressaltarDiferencaMedia(matricula, mediaTurma);
      console.log("Enviando email para : " + matricula.aluno.email);

      // Insere aluno no array com o atributo notificado
      const status = turma.statusNotificacao.filter((s) => s.cpf == matricula.aluno.cpf);

      if (!status[0].notificado) {
        if (this.emailSender.enviarEmail(matricula.aluno.email, "", texto) == true) {
          statusNotificacao.push({ nome: matricula.aluno.nome, cpf: matricula.aluno.cpf, notificado: true });
        } else {
          statusNotificacao.push({ nome: matricula.aluno.nome, cpf: matricula.aluno.cpf, notificado: false });
        }
        console.log(statusNotificacao)
      }
    }
    return statusNotificacao;
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
  ressaltarDiferencaMedia(matricula: Matricula, mediaTurma: number): string {
    var texto: string = "";
    texto = "Sua média: " + matricula.getMedia() + " \n" +
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

