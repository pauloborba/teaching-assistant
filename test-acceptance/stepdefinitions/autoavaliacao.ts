import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the auto-avaliacao page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='auto-avaliacao']").click();
    });

    Given(/^I am at the "([^\"]*)" class$/, async (turma) => {
        await $("button[name='notificar']").click();
        await $("input[name='descricaoTurma']").sendKeys(<string> turma);
        await $("button[name='selecionar']").click();
    });

    When(/^I select the topics "([^\"]*)" and "([^\"]*)"$/, async (meta1, meta2) => {
        await $("input[value='Requisitos']").click();
        await $("input[value='Refatoração']").click();
    });

    When(/^I send the self-grade request to all students$/, async () => {
        await $("button[name='notificarEmail']").click();
    });
})