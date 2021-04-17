import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);
import request = require("request-promise");

var base_url = "http://localhost:3000/";

let mesmaDescricao = ((elem, descricao) => elem.getText().then(text => text === descricao));
let mesmoTipo = ((elem, tipo) => elem.getText().then(text => text === tipo));

async function tamanhoArray(tamanho, array){
  await array.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(tamanho));
}

async function elementosComMesmaDescricao(n,descricao) {
    var alldescricoes : ElementArrayFinder = element.all(by.name('roteirolist'));
    var samedescricoes = alldescricoes.filter(elem => mesmaDescricao(elem,descricao));
    await tamanhoArray(n,samedescricoes);
}

async function elementosComMesmoTipo(n,tipo) {
    var allblocos : ElementArrayFinder = element.all(by.name('blocolist'));
    var sameblocos = allblocos.filter(elem => mesmoTipo(elem,tipo));
    await tamanhoArray(n,sameblocos);
}

async function roteiroVazioNoServidor(p, descricao) {
  let resposta = `{"descricao":"${descricao}","blocos":[]}`;
  await request.get(base_url + "roteiros").then(body => expect(body.includes(resposta)).to.equal(p));
}

async function roteiroNoServidor(p, descricao, tipo, pergunta) {
  let resposta = `{"descricao":"${descricao}","blocos":[{"tipo":"${tipo}","questoes":[{"pergunta":"${pergunta}","dica":""}]}]}`;
  await request.get(base_url + "roteiros").then(body => expect(body.includes(resposta)).to.equal(p));
}
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na página roteiros$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name=roteiros]").click();
    });

    Given(/^Eu não vejo o roteiro "(.*)" na lista de roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(0 , descricao);
    });

    Given(/^Eu vejo o roteiro "(.*)" nos roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(1, descricao);
    });

    Given(/^Eu não vejo blocos do tipo "(.*)" e blocos do tipo "(.*)"$/, async (seq, par) => {
      await elementosComMesmoTipo(0,seq);
      await elementosComMesmoTipo(0,par);
    });

    Given(/^O sistema não possui um roteiro "(.*)"$/, async (descricao) => {
      await roteiroVazioNoServidor(false, descricao);
    });

    Given(/^O sistema possui um roteiro "(.*)" sem blocos$/, async (descricao) => {
      await roteiroVazioNoServidor(true, descricao);
    });

    Given(/^O sistema possui um roteiro "(.*)" com um bloco "(.*)" com a questão "(.*)"$/, async (descricao, tipo, questao) => {
      await roteiroNoServidor(true, descricao, tipo, questao);
    });

    When(/^Eu tento adicionar um roteiro de nome "(.*)"$/, async (descricao) => {
        await $("input[name='descricaobox']").sendKeys(<string> descricao);
        await element(by.name('addRoteiro')).click();
    });

    When(/^Eu tento registrar um bloco do tipo "(.*)"$/, async (tipo) => {
      var select = element(by.name('selectBloco'));
      if(tipo === "Sequencial") await select.$('[value="Sequencial"]').click();
      else await select.$('[value="Paralelo"]').click();
      await element(by.name('addBloco')).click();
    });

    When(/^Eu tento remover o roteiro "(.*)"$/, async (descricao) => {
        await element(by.name('delRoteiro')).click();
    });

    When(/^Eu registro o roteiro "(.*)" sem blocos$/, async (descricao) => {
    let roteiro = {"descricao": descricao, "blocos" : []};
    var options:any = {method: 'POST', uri: (base_url + "roteiro"), body:roteiro, json: true};
    await request(options).then(body => expect(JSON.stringify(body)).to.equal('{"success":"O roteiro foi cadastrado com sucesso"}'));
    });

    When(/^Eu cadastro um bloco "(.*)" com a questão "(.*)" no roteiro "(.*)"$/, async (tipo, pergunta, descricao) => {
    let roteiro = {"descricao": descricao, "blocos" : [{"tipo": tipo,"questoes":[{"pergunta": pergunta,"dica":""}]}]};
    var options:any = {method: 'PUT', uri: (base_url + "roteiro"), body:roteiro, json: true};
    await request(options).then(body => expect(JSON.stringify(body)).to.equal('{"success":"O roteiro foi atualizado com sucesso"}'));
    });

    When(/^Eu deleto o roteiro "(.*)"$/, async (descricao) => {
    var options:any = {method: 'DELETE', uri: (base_url + "roteiro/" + descricao)};
    await request(options).then(body => expect(body).to.equal('{"success":"O roteiro foi removido com sucesso"}'));
    });

    Then(/^Eu vejo o roteiro "(.*)" na lista de roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(1, descricao);
    });

    Then(/^Eu vejo "(.*)" blocos do tipo "(.*)" e "(.*)" blocos do tipo "(.*)"$/, async (n1, seq, n2, par) => {
      await elementosComMesmoTipo(Number(n1),seq);
      await elementosComMesmoTipo(Number(n2),par);
    });

    Then(/^Eu vejo um único roteiro "(.*)" na lista de roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(1, descricao);
    });
    Then(/^Eu não vejo "(.*)" na lista de roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(0, descricao);
    });

    Then(/^Eu vejo uma mensagem de erro$/, async () => {
      var allmsgs : ElementArrayFinder = element.all(by.name('erroRoteiro'));
      await tamanhoArray(1,allmsgs);
    });

    Then(/^O sistema agora possui um roteiro "(.*)" sem blocos$/, async (descricao) => {
      await roteiroVazioNoServidor(true, descricao);
    });

    Then(/^O sistema agora não possui um roteiro "(.*)"$/, async (descricao) => {
      await roteiroVazioNoServidor(false, descricao);
    });

    Then(/^O sistema agora possui um roteiro "(.*)" com um bloco "(.*)" com a questão "(.*)"$/, async (descricao, tipo, questao) => {
      await roteiroNoServidor(true, descricao, tipo, questao);
    });
})
