import { Turma } from '../common/turma'
import { EmailSender } from './emailSender'
import { Matricula } from '../common/matricula'
import { AtualizacoesNotas } from './repos/atualizacoesNotas';
import { AtualizacaoNotas } from '../common/atualizacaoNotas';
import { Aluno } from '../common/aluno';
import { Avaliacao } from '../common/avaliacao';

export class NotificacaoNotas {
  emailSender: EmailSender = new EmailSender();
  atualizacoesNotasRepo: AtualizacoesNotas = new AtualizacoesNotas();

  cadastrarAtualizacaoNotas(turma: Turma, aluno: Aluno, avaliacoesAtualizadas: Avaliacao[]): AtualizacaoNotas {
    let atualizacaoNotas = new AtualizacaoNotas();

    atualizacaoNotas.turma = turma;
    atualizacaoNotas.aluno = aluno;
    atualizacaoNotas.avaliacoes = avaliacoesAtualizadas;
    atualizacaoNotas.dataHora = new Date();

    this.atualizacoesNotasRepo.cadastrarAtualizacaoNotas(atualizacaoNotas);

    return atualizacaoNotas;
  }

  enviarAtualizacoes() {
    let total = 0;
    let enviadas = 0;

    this.atualizacoesNotasRepo.getAtualizacoesNotas().forEach((atualizacaoNotas: AtualizacaoNotas) => {
      if (!atualizacaoNotas.enviada) {
        ++total;

        atualizacaoNotas = this.enviarAtualizacaoNotas(atualizacaoNotas);
        this.atualizacoesNotasRepo.atualizarAtualizacaoNotas(atualizacaoNotas);

        if (atualizacaoNotas.enviada)
          ++enviadas;
      }
    });

    console.info(total > 0 ? `${enviadas} de ${total} atualizações enviadas!` : 'Nenhuma atualização');
  }

  enviarAtualizacoesPendentes() {
    let total = 0;
    let enviadas = 0;

    this.atualizacoesNotasRepo.getAtualizacoesNotas().forEach((atualizacaoNotas: AtualizacaoNotas) => {
      if (!atualizacaoNotas.enviada && !!atualizacaoNotas.erroEnvio) {
        ++total;

        atualizacaoNotas = this.enviarAtualizacaoNotas(atualizacaoNotas);
        this.atualizacoesNotasRepo.atualizarAtualizacaoNotas(atualizacaoNotas);

        if (atualizacaoNotas.enviada)
          ++enviadas;
      }
    });

    console.info(total > 0 ? `${enviadas} de ${total} atualizações pendentes enviadas!` : 'Nenhuma atualização pendente');
  }

  enviarAtualizacaoNotas(notificacao: AtualizacaoNotas): AtualizacaoNotas {
    if (notificacao.aluno.email) {
      const subject = 'Atualização de notas';
      let message = `Turma: ${notificacao.turma.descricao}\nNotas:`;

      notificacao.avaliacoes.forEach((avaliacao: Avaliacao) => {
        message += `\n * ${avaliacao.meta}: ${avaliacao.nota}`;
      });

      if (this.emailSender.enviarEmail(notificacao.aluno.email, subject, message)) {
        notificacao.enviada = true;
        notificacao.erroEnvio = '';
      } else {
        notificacao.erroEnvio = 'Falha ao enviar!';
      }
    } else {
      notificacao.erroEnvio = 'Aluno sem email!';
    }

    return notificacao;
  }

  enviarNotificacao(turma: Turma): string {
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
      if(this.emailSender.enviarEmail(matricula.aluno.email, "", texto) == false){
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
