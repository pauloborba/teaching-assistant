import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^Eu estou na pagina de metas$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
    })

    Given(/^Eu vejo o aluno com CPF "(\d*)" na lista de estudantes$/, async (cpf) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem => elem.getText().then(text => text === cpf));
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^Eu vejo a linha da cor do aluno com CPF "(\d*)" na cor "([^\"]*)"$/, async (cpf, cor) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem => elem.getText().then(text => text === cpf));
        // var samecolor = samecpfs.filter(elem => elem.getCssValue('background-color').then(color => color === cor));
        // await samecolor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

})
