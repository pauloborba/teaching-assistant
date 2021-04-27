import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ElementFinder } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sameEmailCheck(elem, email) { return elem.element(by.name('emaillist')).getText().then(text => text === email);}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertEmailExists(list, email) {
    var sameEmail = list.filter(elem => sameEmailCheck(elem, email));
    await assertTamanhoEqual(sameEmail,1);
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de importar alunos$/, async () => {
        await browser.get("http://localhost:4200/importacao");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    });

    Given(/^os emails "(.*)" e "(.*)" estão presentes na lista de alunos cadastrados$/, async (em1, em2) => {
        await browser.get("http://localhost:4200/alunos");
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await assertEmailExists(allalunos, em1);
        await assertEmailExists(allalunos, em2);
    });
    
    When(/^eu escolho a opção de importar Alunos"(\d*)"$/, async () => {
        // 
    });

    When(/^seleciono a planilha "(\s*)"$/, async (nome) =>{
        // 
    });
    
    Then(/^aparece um aviso avisando que "(\d*)" dos alunos já estavam cadastrados$/, async (numero) => {
        // 
    });
    
    Then(/^eu vejo "(\s*)", "(\s*)", "(\s*)", "(\s*)", "(\s*)" e "(\s*)" nos emails da lista de alunos$/, async (em1, em2, em3, em4, em5) => {
        // tem todos os (\s*) nos alunos tudo
    });
});