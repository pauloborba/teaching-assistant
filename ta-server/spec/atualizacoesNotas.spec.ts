import sinon = require('sinon');

import { Aluno } from '../../common/aluno';
import { Turma } from '../../common/turma';
import { Avaliacao } from '../../common/avaliacao';
import { AtualizacoesNotas } from '../repos/atualizacoesNotas';
import { AtualizacaoNotas } from '../../common/atualizacaoNotas';
import { NotificacaoNotas } from '../notificacaoNotas';

const atualizacoesNotasRepo: AtualizacoesNotas = new AtualizacoesNotas();
const notificacaoNotas = new NotificacaoNotas();

function newAtualizacaoNota(turma: Turma, aluno: Aluno, avaliacoes: Avaliacao[]): AtualizacaoNotas {
  const atualizacaoNotas = new AtualizacaoNotas();
  atualizacaoNotas.turma = turma;
  atualizacaoNotas.aluno = aluno;
  atualizacaoNotas.avaliacoes = avaliacoes;
  return atualizacaoNotas;
}

function cadastrarAtualizacoesNotas(id: number = 0): AtualizacaoNotas[] {
  let atualizacoesNotas = [
    newAtualizacaoNota(
        new Turma('Engenharia de Software e Sistemas'),
        new Aluno('Fernanda Pereira Barbosa', id.toString().padStart(3, '0') + '.000.000-01', 'fpb@ta.example'),
        [ new Avaliacao('Requisitos', 'MA') ]
    ),
    newAtualizacaoNota(
        new Turma('Gerenciamento de Dados e Informação'),
        new Aluno('Igor Carvalho Costa', id.toString().padStart(3, '0') + '.000.000-02', 'icc@ta.example'),
        [
          new Avaliacao('SQL', 'MPA'),
          new Avaliacao('PL/SQL', 'MA')
        ]
    ),
    newAtualizacaoNota(
        new Turma('Informática Teórica'),
        new Aluno('Lavinia Rodrigues Cunha', id.toString().padStart(3, '0') + '.000.000-03', 'lrc@ta.example'),
        [ new Avaliacao('Autômato Finito Determinístico', 'MA') ]
    )
  ];

  atualizacoesNotas.forEach((atualizacaoNota: AtualizacaoNotas) => {
    notificacaoNotas.cadastrarAtualizacaoNotas(atualizacaoNota.turma, atualizacaoNota.aluno, atualizacaoNota.avaliacoes);
  });

  return atualizacoesNotas;
}

function compararAtualizacoesNotas(a: AtualizacaoNotas[]): void {
  const atualizacoesNotas: AtualizacaoNotas[] = atualizacoesNotasRepo.getAtualizacoesNotas();

  expect(atualizacoesNotas.length).toBe(a.length);

  a.forEach((atualizacaoNota: AtualizacaoNotas, i: number) => {
    expect(atualizacoesNotas[i].aluno.cpf).toBe(atualizacaoNota.aluno.cpf);
    expect(atualizacoesNotas[i].turma.descricao).toBe(atualizacaoNota.turma.descricao);
    expect(atualizacoesNotas[i].enviada).toBe(atualizacaoNota.enviada);
    expect(atualizacoesNotas[i].erroEnvio).toBe(atualizacaoNota.erroEnvio);

    atualizacaoNota.avaliacoes.forEach((avaliacao: Avaliacao, j: number) => {
      expect(atualizacoesNotas[i].avaliacoes[j].meta).toBe(avaliacao.meta);
      expect(atualizacoesNotas[i].avaliacoes[j].nota).toBe(avaliacao.nota);
    });
  });
}

describe('Atualização de notas:', () => {
  let clock: sinon.SinonFakeTimers;
  let server: any;

  beforeEach(() => {
    clock = sinon.useFakeTimers(new Date((new Date()).setHours(0, 0, 0, 0)));
    server = require('../ta-server');
    AtualizacoesNotas.drop();
  });

  afterEach(() => {
    server.closeServer();
    sinon.restore();
  });

  it('o envio dos emails deve ser executado somente às 18 horas', () => {
    let atualizacoesNotas: AtualizacaoNotas[] = [];

    compararAtualizacoesNotas(atualizacoesNotas);

    atualizacoesNotas = cadastrarAtualizacoesNotas(1);
    compararAtualizacoesNotas(atualizacoesNotas);

    clock.tick('17:59:59');

    compararAtualizacoesNotas(atualizacoesNotas);

    clock.tick('1');

    atualizacoesNotas.forEach((atualizacaoNota: AtualizacaoNotas) => {
      atualizacaoNota.enviada = true;
    });

    compararAtualizacoesNotas(atualizacoesNotas);

    atualizacoesNotas = atualizacoesNotas.concat(cadastrarAtualizacoesNotas(2));
    compararAtualizacoesNotas(atualizacoesNotas);

    clock.tick('06:00:00');

    compararAtualizacoesNotas(atualizacoesNotas);
  });

  it('o cadastro funciona corretamente', () => {
    compararAtualizacoesNotas(cadastrarAtualizacoesNotas());
  });
});
