import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import request = require('request-promise');
import { AtualizacaoNotas } from '../../common/atualizacaoNotas';
import { AtualizacoesNotas } from '../../ta-server/repos/atualizacoesNotas';
import { Aluno } from '../../common/aluno';
import { Turma } from '../../common/turma';
import { Avaliacao } from '../../common/avaliacao';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const atualizacoesNotasURL = 'http://localhost:3000/notificacoes/atualizacoes-notas';

defineSupportCode(function ({ Given, When, Then }) {
  let atualizacoesNotas: Map<string, AtualizacaoNotas> = new Map()

  Given(/^that no student grades have been updated$/, async () => {
    await request.get(atualizacoesNotasURL).then(body => {
      expect(JSON.parse(body)).to.be.an('array').that.is.empty;
    });
  });

  Given(/^no updated grades failed to send$/, async () => {
    await request.get(atualizacoesNotasURL).then(body => {
      (<AtualizacaoNotas[]>JSON.parse(body)).forEach((atualizacaoNotas: AtualizacaoNotas) => {
        expect(atualizacaoNotas.erroEnvio).to.equal('');
      });
    });
  });

  Given(/^that the student "([^"]+)" had the "([^"]+)" grade updated to "([^"]+)" at "([^"]+)"$/, async (nome, meta, nota, data) => {
    const atualizacaoNotas = new AtualizacaoNotas();
    atualizacaoNotas.dataHora = new Date(data.toString());
    atualizacaoNotas.turma = new Turma();
    atualizacaoNotas.turma.descricao = 'ESS';
    atualizacaoNotas.aluno = new Aluno();
    atualizacaoNotas.aluno.cpf = (Math.random() * 1000).toString();
    atualizacaoNotas.aluno.nome = nome.toString();

    atualizacaoNotas.avaliacoes[0] = new Avaliacao();
    atualizacaoNotas.avaliacoes[0].meta = meta.toString();
    atualizacaoNotas.avaliacoes[0].nota = nota.toString();

    atualizacoesNotas.set(nome.toString(), atualizacaoNotas);

    await request({
      method: 'POST',
      uri: atualizacoesNotasURL,
      body: atualizacaoNotas,
      json: true
    }).then(body => expect(JSON.stringify(body)).to.equal('{"success":"A atualização foi cadastrada com sucesso"}'));
  });

  Given(/^it is not past 18:00$/, async () => {
  });

  Given(/^it is past 18:00$/, async () => {
  });

  Given(/^it failed to send the updated grades to the student "([^"]+)"$/, async (nome) => {
    const atualizacaoNotas = atualizacoesNotas.get(nome.toString());
    atualizacaoNotas.erroEnvio = 'ERRO!'

    await request({
      method: 'POST',
      uri: atualizacoesNotasURL,
      body: atualizacaoNotas,
      json: true
    }).then(body => expect(JSON.stringify(body)).to.equal('{"success":"A atualização foi cadastrada com sucesso"}'));
  });

  Given(/^no student grades have been updated after 18:00$/, async () => {
  });

  When(/^I go to the "([^"]+)" page$/, async (pageName) => {
  });

  Then(/^I see a message that there no updated grades$/, async () => {

  });

  Then(/^I see a list with "([^\-]+) - ([^\-]+) - ([^\"\-]+)(?: - ([^\"]+))?"$/, async (nome, meta, nota, parms) => {
  });
});
