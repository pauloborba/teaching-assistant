import { Turma } from '../../common/turma';
import { EmailSender } from '../emailSender';
import { Matricula } from '../../common/matricula';

export class Turmas {
  private static turmas: Turma[] = [];
  private static emailSender:EmailSender;
  getTurmas(): Turma[] {
    return Turmas.turmas;
  }

  getTurma(descricao: string): Turma {
    return Turmas.turmas.find(t => t.descricao === descricao);
  }

  sendAllMails(descricao:string): boolean {
    Turmas.emailSender = new EmailSender();
    const turma: Turma = this.getTurma(descricao);
    let parsedTurma = new Turma();
    parsedTurma.copyFrom(turma);
    Turmas.emailSender.filterAllInformations(parsedTurma.matriculas, descricao);
    return true;
  }

  
  cadastrarTurma(t: Turma): Turma {
    const turma: Turma = new Turma();
    turma.copyFrom(t);

    if (turma.descricao && this.descricaoNaoCadastrada(turma.descricao)) {
      Turmas.turmas.push(turma);
      return turma;
    }

    return null;
  }

  atualizarTurma(t: Turma): Turma {
    const turma: Turma = Turmas.turmas.find(u => u.descricao === t.descricao);
    if (turma)
      turma.copyFrom(t);
    return turma;
  }

  removerTurma(descricaoTurma: string): Turma {
    const turma: Turma = Turmas.turmas.find(t => t.descricao === descricaoTurma);
    if (turma) {
      Turmas.turmas = Turmas.turmas.filter(t => t.descricao !== turma.descricao);
      return turma;
    } else {
      return null;
    }
  }

  getResumos(descricoes: string[]): any[] {
    let resumos: any[] = [];
    descricoes.forEach(descricao => {
      const turma = this.getTurma(descricao);
      if (turma) {
        const media = turma.media;
        const reprovacao = turma.numReprovados / turma.numMatriculas;
        resumos.push({ descricao, media, reprovacao });
      }
    });

    return resumos;
  }

  private descricaoNaoCadastrada(descricao: string): boolean {
    return !Turmas.turmas.find(t => t.descricao === descricao);
  }
}
