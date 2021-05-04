import sinon = require('sinon');

import { Aluno } from '../../common/aluno';
import { Turma } from '../../common/turma';
import { Avaliacao } from '../../common/avaliacao';
import { AtualizacoesNotas } from '../repos/atualizacoesNotas';
import { AtualizacaoNotas } from '../../common/atualizacaoNotas';
import { NotificacaoNotas } from '../notificacaoNotas';

const atualizacoesNotasRepo: AtualizacoesNotas = new AtualizacoesNotas();
const notificacaoNotas = new NotificacaoNotas();

function newAluno(cpf: string, nome: string, email: string = ''): Aluno {
  const aluno = new Aluno();
  aluno.cpf = cpf;
  aluno.nome = nome;
  aluno.email = email;
  return aluno;
}

function newTurma(descricao: string): Turma {
  const turma = new Turma();
  turma.descricao = descricao;
  return turma;
}

function newAvaliacao(meta: string, nota: string): Avaliacao {
  const avaliacao = new Avaliacao();
  avaliacao.meta = meta;
  avaliacao.nota = nota;
  return avaliacao;
}

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
        newTurma('Engenharia de Software e Sistemas'),
        newAluno(id.toString().padStart(3, '0') + '.000.000-01', 'Fernanda Pereira Barbosa', 'fpb@ta.example'),
        [ newAvaliacao('Requisitos', 'MA') ]
    ),
    newAtualizacaoNota(
        newTurma('Gerenciamento de Dados e Informação'),
        newAluno(id.toString().padStart(3, '0') + '.000.000-02', 'Igor Carvalho Costa', 'icc@ta.example'),
        [
          newAvaliacao('SQL', 'MPA'),
          newAvaliacao('PL/SQL', 'MA')
        ]
    ),
    newAtualizacaoNota(
        newTurma('Informática Teórica'),
        newAluno(id.toString().padStart(3, '0') + '.000.000-03', 'Lavinia Rodrigues Cunha', 'lrc@ta.example'),
        [ newAvaliacao('Autômato Finito Determinístico', 'MA') ]
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
