import { AtualizacaoNotas } from '../../common/atualizacaoNotas';

export class AtualizacoesNotas {
  private static atualizacoesNotas: AtualizacaoNotas[] = [];

  getAtualizacoesNotas(): AtualizacaoNotas[] {
    return AtualizacoesNotas.atualizacoesNotas;
  }

  getAtualizacaoNotas(alunoCPF: string, turmaDescricao: string): AtualizacaoNotas {
    return AtualizacoesNotas.atualizacoesNotas.find(a => a.aluno.cpf === alunoCPF && a.turma.descricao === turmaDescricao && !a.enviada);
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
    const atualizacaoNotas: AtualizacaoNotas = AtualizacoesNotas.atualizacoesNotas.find(
        v => v.aluno.cpf === a.aluno.cpf
            && v.turma.descricao === a.turma.descricao
            && v.dataHora.valueOf() === a.dataHora.valueOf()
    )

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
}
