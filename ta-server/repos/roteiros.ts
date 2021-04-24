import { Roteiro } from '../../common/roteiro';

export class Roteiros {
  private static roteiros: Roteiro[] = [];

  getRoteiros(): Roteiro[] {
    return Roteiros.roteiros;
  }

  getRoteiro(descricao: string): Roteiro {
    return Roteiros.roteiros.find(r => r.descricao === descricao);
  }

  cadastrarRoteiro(r: Roteiro): Roteiro {
    const roteiro: Roteiro = new Roteiro();
    roteiro.copyFrom(r);

    if (roteiro.descricao && this.descricaoNaoCadastrada(roteiro.descricao)) {
      Roteiros.roteiros.push(roteiro);
      return roteiro;
    }

    return null;
  }

  atualizarRoteiro(r: Roteiro): Roteiro {
    const roteiro: Roteiro = Roteiros.roteiros.find(o => o.descricao === r.descricao);
    if (roteiro)
      roteiro.copyFrom(r);
    return roteiro;
  }

  removerRoteiro(descricaoRoteiro: string): Roteiro {
    const roteiro: Roteiro = Roteiros.roteiros.find(r => r.descricao === descricaoRoteiro);
    if (roteiro) {
      Roteiros.roteiros = Roteiros.roteiros.filter(r => r.descricao !== roteiro.descricao);
      return roteiro;
    } else {
      return null;
    }
  }

  private descricaoNaoCadastrada(descricao: string): boolean {
    return !Roteiros.roteiros.find(r => r.descricao === descricao);
  }
}
