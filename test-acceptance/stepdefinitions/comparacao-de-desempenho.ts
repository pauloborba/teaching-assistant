import { defineSupportCode } from 'cucumber';
import { browser, by, element, ElementArrayFinder, ExpectedConditions } from 'protractor';

const expect = require('chai').use(require('chai-as-promised')).expect;

const cadastrarTurma = async (descricao) => {
    await element(by.name('input-descricao')).sendKeys(<string> descricao);
    await element(by.name('botao-adicionar-turma')).click();
};

const getTurmasCadastradas = () => element.all(by.name('turma'));

const mesmaDescricao = (turma, descricao) => turma.element(by.name('descricao')).getText().then(texto => texto === descricao);
const mesmaMedia = (turma, media) => turma.element(by.name('media')).getText().then(texto => texto === media);

defineSupportCode(({ Given, When, Then }) => {
    Given(/^I am at the classes page$/, async () => {
        await browser.get('http://localhost:4200/');
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await element(by.name('turmas')).click();
    });

    Given(/^I can see the class "(.*)" with average grade "(.*)" at the classes list$/, async (descricao, media) => {
        await cadastrarTurma(descricao);
        getTurmasCadastradas().filter(turma => mesmaDescricao(turma, descricao) && mesmaMedia(turma, media))
            .then(turmas => expect(Promise.resolve(turmas.length)).to.eventually.equal(1));
    });

    Given(/^I can only see the class "(.*)" in the classes list$/, async (descricao) => {
        await cadastrarTurma(descricao);
        const turmasCadastradas: ElementArrayFinder = getTurmasCadastradas();

        expect(turmasCadastradas.count()).to.eventually.equal(1);
        turmasCadastradas.filter(turma => mesmaDescricao(turma, descricao))
            .then(turmas => expect(Promise.resolve(turmas.length)).to.eventually.equal(1));
    });

    When(/^I request a performance comparison$/, async () => {
        await element(by.name('botao-opcoes-comparacao')).click();
    });

    When(/^I select the option to compare the last four classes$/, async () => {
        await element(by.name('botao-ultimas-quatro-turmas')).click();
        await element(by.name('botao-confirmar')).click();
    });

    When(/^I select the option to choose classes$/, async () => {
        await element(by.name('botao-escolher-turmas')).click();
    });

    When(/^I choose the classes "(.*)" and "(.*)"$/, async (primeiraDescricao, segundaDescricao) => {
        await element(by.buttonText(<string> primeiraDescricao)).click();
        await element(by.buttonText(<string> segundaDescricao)).click();
        await element(by.name('botao-confirmar')).click();
    });

    When(/^I select the option to compare all classes$/, async () => {
        await element(by.name('botao-todas-turmas')).click();
        await element(by.name('botao-confirmar')).click();
    });

    Then(/^I am at the performance comparison page$/, async () => {
        const url: string = await browser.getCurrentUrl();
        expect(url.includes('comparacao-de-desempenho')).to.equal(true);
    });

    Then(/^I can see a chart with the classes average grades$/, async () => {
        expect(element(by.id('media')).isPresent()).to.eventually.equal(true);
    });

    Then(/^the average grade chart has "(\d*)" points$/, async (numPontos) => {
        const dataset: any = await browser.executeScript("return document.querySelector('#media').dataset");
        const labels: string[] = dataset.labels.split(',');
        const valores: string[] = dataset.valores.split(',');

        expect(labels.length).to.equal(+numPontos);
        expect(valores.length).to.equal(+numPontos);
    });

    Then(/^the average grade chart associates the class "(.*)" to the average grade "(.*)"$/, async (descricao, media) => {
        const dataset: any = await browser.executeScript("return document.querySelector('#media').dataset");
        const labels: string[] = dataset.labels.split(',');
        const valores: string[] = dataset.valores.split(',');

        let associaTurmaMedia: boolean = false;
        for (let i = 0; i < labels.length && !associaTurmaMedia; i++) {
            if (labels[i] === descricao && valores[i] === media) {
                associaTurmaMedia = true;
            }
        }

        expect(associaTurmaMedia).to.equal(true);
    });

    Then(/^I can see an error message stating I can\'t request a performance comparison$/, async () => {
        expect(element(by.name('modal-erro')).isPresent()).to.eventually.equal(true);
    });
});