const { BeforeAll, After, AfterAll, Status, defineSupportCode } = require("cucumber");
import { protractor, browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var until = protractor.ExpectedConditions;

async function fillInput(grade) {
    await element(by.xpath('/html/body/app-root/html/body/app-notas/div/div[2]/table/tbody/tr[1]/td[4]/input')).clear().then(async function () {
       await element(by.xpath('/html/body/app-root/html/body/app-notas/div/div[2]/table/tbody/tr[1]/td[4]/input')).sendKeys(<string> grade);
    });
}

async function checkGrade(grade) {
    var firstTd = element(by.xpath('/html/body/app-root/html/body/app-notas/div/div[2]/table/tbody/tr[1]/td[4]'));
    await element.all(by.xpath('/html/body/app-root/html/body/app-notas/div/div[2]/table/tbody/tr[1]/td[4]')).first().getText().then(async function(text){
        await expect(text).to.equal(grade);
    });
}

async function checkPopup() {
    await expect(element(by.css('.matricula-repetida')).isPresent()).to.eventually.equal(true);
}

async function selectMatricula(turma, matricula) {
    await element(by.xpath('//*[@id="add-turma-descricao"]')).sendKeys(<string> turma);
    await $('body').sendKeys(protractor.Key.ENTER);

    await browser.wait(until.presenceOf(element(by.xpath('//*[@id="add-matricula-cpf"]'))), 5000, 'Element taking too long to appear in the DOM');
    await element(by.xpath('//*[@id="add-matricula-cpf"]')).sendKeys(<string> matricula);
    await $('body').sendKeys(protractor.Key.ENTER);
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the "([^\"]*)" page$/, async (page) => {
        await browser.get(`http://localhost:4200/${page}`);
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    })

    When(/^I select the turma "([^\"]*)" with matricula "([^\"]*)"$/, async (turma, matricula) => {
        await selectMatricula(turma, matricula);
    });

    When(/^I click "([^\"]*)" button$/, async (buttonName) => {
        await element.all(by.partialButtonText(buttonName)).get(0).click();
    });

    When(/^I fill the input with "([^\"]*)"$/, async (grade) => {
       await fillInput(grade);
    });

    Then(/^I must see "([^\"]*)" in the grade$/, async (grade) => {
       await checkGrade(grade);
    });
    
    Then(/^I must see the popup$/, async () => {
        await checkPopup();
    });
      
    Then(/^I can see student "([^\"]*)" and the matricula grades$/, async (nome) => {
        element.all(by.css('matriculas-nome')).map(function(elm) {
            return elm.getText();   
        }).then(function(texts) {
            texts.every(x => x == nome);
        });
    });

})