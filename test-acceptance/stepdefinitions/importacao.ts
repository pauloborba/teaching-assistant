import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ElementFinder } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var path = require('path');

function sameEmailCheck(elem, email) { return elem.element(by.name('emaillist')).getText().then(text => text === email);}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertEmailExists(list, email) {
    var sameEmail = list.filter(elem => sameEmailCheck(elem, email));
    await assertTamanhoEqual(sameEmail,1);
}

async function criarAluno(nome, email) {
    await $("input[name='namebox']").sendKeys(<string> nome);
    await $("input[name='emailbox']").sendKeys(<string> email);
    await element(by.name('addAluno')).click();
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de alunos$/, async () => {
        await browser.get("http://localhost:4200/alunos");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    });

    Given(/^os alunos "(.*)" e "(.*)" de emails "(.*)" e "(.*)" estão presentes na lista de alunos cadastrados$/, async (nome1, nome2, em1, em2) => {
        // Criar Lucas
        await criarAluno(nome1, em1);
        // Criar Alyson
        await criarAluno(nome2, em2);
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await assertEmailExists(allalunos, em1);
        await assertEmailExists(allalunos, em2);
    });

    When(/^eu vou para a página de importar alunos$/, async () => {
        await browser.get("http://localhost:4200/importacao");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    });


    When(/^eu seleciono a planilha "(.*)"$/, async (planilha) =>{
        var arquivo = `../planilhas/${planilha}`;
        var caminho = path.resolve(__dirname, arquivo);
        await element(by.name('csv')).sendKeys(caminho);
    });
    
    Then(/^aparece um aviso avisando que "(\d*)" dos alunos já estavam cadastrados$/, async (numero) => {
        await expect(browser.switchTo().alert());
    });
    
    Then(/^eu vejo "(\s*)", "(\s*)", "(\s*)", "(\s*)", "(\s*)" e "(\s*)" nos emails da lista de alunos$/, async (em1, em2, em3, em4, em5) => {
        // tem todos os (\s*) nos alunos tudo
    });

    
});