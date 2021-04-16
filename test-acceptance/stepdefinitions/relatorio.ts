import { defineSupportCode} from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
let base_url = "http://localhost:3000/";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

defineSupportCode(function ({Given, When, Then}) {
    
    Given(/^o aluno está na pagina inicial$/, async () => {
        await browser.get("http://localhost:4200/");
    });
    Given(/^o sistema tem "(\d*)" matriculas$/, async () => {

    });
    When(/^o aluno entrar na tela de relatório sobre os roteiros$/, async (nota, meta) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='relatorio']").click();

    });

});