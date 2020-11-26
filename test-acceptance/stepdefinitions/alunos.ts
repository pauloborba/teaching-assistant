import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertElementsWithSameCPFAndName(n,cpf,name) { 
    var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
    var samecpfsandname = allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name)));
    await assertTamanhoEqual(samecpfsandname,n);
}

async function localizarAlunoLista(n,cpf) {
    var allalunos: ElementArrayFinder = element.all(by.name('alunolist'));
    var samecpfs = allalunos.filter(elem => sameCPF(elem, cpf));
    await assertTamanhoEqual(samecpfs, n); 
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na pagina de metas$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
    })

    Given(/^Eu vejo o aluno com CPF "(\d*)" na lista de estudantes$/, async (cpf) => {
        await localizarAlunoLista(0, cpf);
    });

    Then(/^Eu vejo a linha da cor do aluno com CPF "(\d*)" na cor "([^\"]*)"$/, async (cpf, cor) => {
        await assertElementsWithSameCPFAndName(1,cpf,cor);
    });

})
