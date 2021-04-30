import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
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
    Given(/eu estou na tela "(.*)"$/, async (t) => {
        await browser.get("http://localhost:4200/turmas");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    });

    Given(/^eu vejo a turma "(.*)"$/, async (t) => {
        const el = await element(by.id('turma-' + t.toString()));
        await expect(el.getText()).to.eventually.equal(t.toString());

    });

    When(/^eu seleciono a turma "(.*)"$/, async (t) => {    
        await element(by.id('button-'+t)).click();
    });

    When(/^envio novas notificações de notas aos alunos da turma "(.*)"$/, async (t) => {
        await (element(by.id('notificar-'+t)).click());
    });

    Then(/^eu vejo na tela uma mensagem indicando que a turma "(.*)" possui novas atualizações de status de notificações$/, async (t) => {
        await browser.sleep(4000);
        const el = await element(by.id('novaNotificacao'));
        await expect(el.getText()).to.eventually.equal('Aviso: essa turma possui novas notificações');   
    });

    // Cenário 2
    Given(/^a turma "(.*)" não possui nenhum aluno matriculado$/, async (s) => {
        const list = element.all(by.name('aluno-turma'));
        expect(list.count()).to.eventually.equal(0);
    });

    Then(/^eu vejo na tela uma mensagem indicando que a turma "(.*)" ainda não possui notas enviadas aos alunos, pois não há aluno matriculado$/, async (t) => {
        await browser.sleep(1000);
        const el = await element(by.id('notificacaoNenhumAluno'));
        await expect(el.getText()).to.eventually.equal('Essa turma não possui notificações de notas a serem exibidas, pois nenhum aluno foi cadastrado nela');   
    });

    // Cenário 3
    Then(/^eu vejo a mensagem "(.*)"$/, async (t) => {
        await browser.sleep(1000);
        const el = await element(by.id('notificacaoTodosAlunosReceberam'));
        await expect(el.getText()).to.eventually.equal(t.toString());   
    });

    // Cenário 4

    Then(/^eu vejo o aluno "(.*)" com o status "Notificado: Sim" e o aluno "(.*)" com o status "Notificado: Sim"$/, async (a1, a2) => {
        await browser.sleep(2000);
        const el = await element(by.id('notificado-'+a1));
        const e2 = await element(by.id('notificado-'+a2));
        await expect(el.getText()).to.eventually.equal('Sim');   
        await expect(e2.getText()).to.eventually.equal('Sim');   
    });
        
});

