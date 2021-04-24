import { Roteiros } from '../repos/roteiros';
import { Roteiro } from '../../common/roteiro';
import { BlocoDeQuestoes } from '../../common/blocoDeQuestoes';

describe("O cadastro de roteiros", () => {
  var cadastro: Roteiros = new Roteiros();

  function cadastrarRoteiro(descricao:string) {
    var roteiro: Roteiro = new Roteiro();
    roteiro.descricao = descricao;
    roteiro.blocos = [];
    cadastro.cadastrarRoteiro(roteiro);
  }

  function expectSoUmRoteiro() {
    expect(cadastro.getRoteiros().length).toBe(1);
    var roteiro = cadastro.getRoteiros()[0];
    return roteiro;
  }

  afterEach(() => cadastro.getRoteiros().forEach((roteiro: Roteiro) => cadastro.removerRoteiro(roteiro.descricao)))

  it("cadastra roteiro", () => {
    cadastrarRoteiro("Roteiro de requisitos");

    var roteiro = expectSoUmRoteiro();
    expect(roteiro.descricao).toBe("Roteiro de requisitos");
    expect(roteiro.blocos.length).toBe(0);
  })

  it("remove roteiro", () => {
    cadastrarRoteiro("Roteiro de requisitos");

    var roteiro = expectSoUmRoteiro();
    cadastro.removerRoteiro(roteiro.descricao);
    expect(cadastro.getRoteiros().length).toBe(0);
  })

  it("atualiza roteiro", () => {
    cadastrarRoteiro("Roteiro de requisitos");

    var roteiro = expectSoUmRoteiro();
    expect(roteiro.blocos.length).toBe(0);

    var bloco = new BlocoDeQuestoes();
    bloco.tipo = "Paralelo";

    roteiro.blocos.push(bloco);
    cadastro.atualizarRoteiro(roteiro);

    roteiro = expectSoUmRoteiro();
    expect(roteiro.blocos.length).toBe(1);
  })

})
