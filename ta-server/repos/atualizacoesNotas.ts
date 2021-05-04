import { AtualizacaoNotas } from '../../common/atualizacaoNotas';

export class AtualizacoesNotas {
  private static atualizacoesNotas: AtualizacaoNotas[] = [];

  getAtualizacoesNotas(): AtualizacaoNotas[] {
    return AtualizacoesNotas.atualizacoesNotas;
  }

  getAtualizacaoNotas(alunoCPF: string, turmaDescricao: string): AtualizacaoNotas {
    return this.findAtualizacaoNotas(alunoCPF, turmaDescricao, null, false);
  }

  cadastrarAtualizacaoNotas(a: AtualizacaoNotas): AtualizacaoNotas {
    let atualizacaoNotas: AtualizacaoNotas = this.getAtualizacaoNotas(a.aluno.cpf, a.turma.descricao);

    if (!atualizacaoNotas) {
      atualizacaoNotas = new AtualizacaoNotas();
      atualizacaoNotas.copyFrom(a);

      AtualizacoesNotas.atualizacoesNotas.push(atualizacaoNotas);
    } else {
      atualizacaoNotas.copyFrom(a);
    }

    return atualizacaoNotas;
  }

  atualizarAtualizacaoNotas(a: AtualizacaoNotas): AtualizacaoNotas {
    const atualizacaoNotas: AtualizacaoNotas = this.findAtualizacaoNotas(a.aluno.cpf, a.turma.descricao, a.dataHora);

    if (atualizacaoNotas) {
      atualizacaoNotas.copyFrom(a);
    } else {
      this.cadastrarAtualizacaoNotas(a);
    }

    return atualizacaoNotas;
  }

  static drop(): void {
    AtualizacoesNotas.atualizacoesNotas = [];
  }

  private findAtualizacaoNotas(alunoCpf: string, turmaDescricao: string, dataHora: Date = null, enviada: boolean = null): AtualizacaoNotas {
    return AtualizacoesNotas.atualizacoesNotas.find(
        v => v.aluno.cpf === alunoCpf
            && v.turma.descricao === turmaDescricao
            && (!dataHora || v.dataHora.valueOf() === dataHora.valueOf())
            && (enviada === null || v.enviada === enviada)
    );
  }
}
