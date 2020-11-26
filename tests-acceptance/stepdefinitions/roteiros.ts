import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na página roteiros$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name=roteiros]").click();
    });

    Given(/^Eu não vejo o roteiro “(.*)” na lista de roteiros$/, async (descricao) => {
        var alldescricoes : ElementArrayFinder = element.all(by.name('roteirolist'));
        var samedescricoes = alldescricoes.filter(elem =>
                                      elem.getText().then(text => text === descricao));
        await samedescricoes.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Given(/^Eu vejo o roteiro “(.*)” nos roteiros$/, async (descricao) => {
        var alldescricoes : ElementArrayFinder = element.all(by.name('roteirolist'));
        var samedescricoes = alldescricoes.filter(elem =>
                                      elem.getText().then(text => text === descricao));
        await samedescricoes.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^Eu não vejo blocos do tipo "(.*)" e blocos do tipo "(.*)"$/, async (seq, par) => {
      var allblocos : ElementArrayFinder = element.all(by.name('blocolist'));
      var sameblocos = allblocos.filter(elem =>
                                    elem.getText().then(text => text === seq));
      await sameblocos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
      sameblocos = allblocos.filter(elem =>
                                    elem.getText().then(text => text === par));
      await sameblocos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    When(/^Eu tento adicionar um roteiro de nome “(.*)”$/, async (descricao) => {
        await $("input[name='descricaobox']").sendKeys(<string> descricao);
        await element(by.buttonText('Adicionar')).click();
    });

    When(/^Eu tento registrar um bloco do tipo "(.*)"$/, async (tipo) => {
      var select = element(by.name('selectBloco'));
      if(tipo === "Paralelo") await select.$('[value="Paralelo"]').click();
      else await select.$('[value="Sequencial"]').click();
      await element(by.buttonText('Adicionar bloco')).click();
    });

    When(/^Eu tento remover o roteiro “(.*)”$/, async (descricao) => {
        await element(by.buttonText('Deletar')).click();
    });

    Then(/^Eu vejo o roteiro “(.*)” na lista de roteiros$/, async (descricao) => {
        var alldescricoes : ElementArrayFinder = element.all(by.name('roteirolist'));
        var samedescricoes = alldescricoes.filter(elem =>
                                      elem.getText().then(text => text === descricao));
        await samedescricoes.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^Eu vejo "(.*)" blocos do tipo "(.*)" e "(.*)" blocos do tipo "(.*)"$/, async (n1, seq, n2, par) => {
      var allblocos : ElementArrayFinder = element.all(by.name('blocolist'));
      var sameblocos = allblocos.filter(elem =>
                                    elem.getText().then(text => text === seq));
      await sameblocos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(Number(n1)));
      sameblocos = allblocos.filter(elem =>
                                    elem.getText().then(text => text === par));
      await sameblocos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(Number(n2)));
    });

    Then(/^Eu vejo um único roteiro “(.*)” na lista de roteiros$/, async (descricao) => {
        var alldescricoes : ElementArrayFinder = element.all(by.name('roteirolist'));
        var samedescricoes = alldescricoes.filter(elem =>
                                      elem.getText().then(text => text === descricao));
        await samedescricoes.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    Then(/^Eu não vejo “(.*)” na lista de roteiros$/, async (descricao) => {
        var alldescricoes : ElementArrayFinder = element.all(by.name('roteirolist'));
        var samedescricoes = alldescricoes.filter(elem =>
                                      elem.getText().then(text => text === descricao));
        await samedescricoes.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });
})
