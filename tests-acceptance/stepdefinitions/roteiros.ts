import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

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
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na página roteiros$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name=roteiros]").click();
    });

    Given(/^Eu não vejo o roteiro “(.*)” na lista de roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(0 , descricao);
    });

    Given(/^Eu vejo o roteiro “(.*)” nos roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(1, descricao);
    });

    Given(/^Eu não vejo blocos do tipo "(.*)" e blocos do tipo "(.*)"$/, async (seq, par) => {
      await elementosComMesmoTipo(0,seq);
      await elementosComMesmoTipo(0,par);
    });

    When(/^Eu tento adicionar um roteiro de nome “(.*)”$/, async (descricao) => {
        await $("input[name='descricaobox']").sendKeys(<string> descricao);
        await element(by.name('addRoteiro')).click();
    });

    When(/^Eu tento registrar um bloco do tipo "(.*)"$/, async (tipo) => {
      var select = element(by.name('selectBloco'));
      if(tipo === "Sequencial") await select.$('[value="Sequencial"]').click();
      else await select.$('[value="Paralelo"]').click();
      await element(by.name('addBloco')).click();
    });

    When(/^Eu tento remover o roteiro “(.*)”$/, async (descricao) => {
        await element(by.name('delRoteiro')).click();
    });

    Then(/^Eu vejo o roteiro “(.*)” na lista de roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(1, descricao);
    });

    Then(/^Eu vejo "(.*)" blocos do tipo "(.*)" e "(.*)" blocos do tipo "(.*)"$/, async (n1, seq, n2, par) => {
      await elementosComMesmoTipo(Number(n1),seq);
      await elementosComMesmoTipo(Number(n2),par);
    });

    Then(/^Eu vejo um único roteiro “(.*)” na lista de roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(1, descricao);
    });
    Then(/^Eu não vejo “(.*)” na lista de roteiros$/, async (descricao) => {
        await elementosComMesmaDescricao(0, descricao);
    });

    Then(/^Eu vejo uma mensagem de erro$/, async () => {
      var allmsgs : ElementArrayFinder = element.all(by.name('erroRoteiro'));
      await tamanhoArray(1,allmsgs);
    });
})
