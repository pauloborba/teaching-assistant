import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ElementFinder } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sameEmailCheck(elem, email) { return elem.element(by.name('emaillist')).getText().then(text => text === email); }

async function assertTamanhoEqual(set, n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertEmailExists(list, email) {
    var sameEmail = list.filter(elem => sameEmailCheck(elem, email));
    await assertTamanhoEqual(sameEmail, 1);
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na tela "(.*)"$/, async () => {
        await browser.get("http://localhost:4200/turmas");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    });

    Given(/^Eu vejo a turma "ESS-2020.1"$/, async () => {
        await browser.get("http://localhost:4200/turmas");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    });

    When(/^eu seleciono a turma "ESS-2020.1"$/, async () => {
        // 
    });

    When(/^envio novas notificações de notas aos alunos da turma "ESS-2020.1"$/, async () => {
        // 
    });

    Then(/^eu vejo na tela uma mensagem indicando que a turma "ESS-2020.1" possui novas atualizações de status de notificações$/, async () => {
        // 
    });

});