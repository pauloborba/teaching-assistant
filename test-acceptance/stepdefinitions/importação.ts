import { error } from 'console';
import { defineSupportCode} from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
let base_url = "http://localhost:3000/";

var {setDefaultTimeout} = require('cucumber');
var path = require('path')
var absolutePath = "";
setDefaultTimeout(60 * 1000);

//async function getNotaBox(meta, nota) {
//    let notaSelecionada: any = await element(by.id(meta.toString())).getAttribute('value') === nota.toString();
//    return notaSelecionada;
//};



defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de notas da disciplina “ESS” que possui os alunos “Pedro” e “Mariana”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.name("Importar Planilha")).click();
    });


    When(/^eeu importo a planilha “test.csv”$/, async () => {
        var fileToUpload = '../stepdefinitions/test.csv',
        absolutePath = path.resolve(__dirname, fileToUpload);
        await element(by.css('input[type="file"]')).sendKeys(absolutePath);    
        await element(by.id('uploadButton')).click();
    });


    Then(/^eu recebo confirmação do armazenamento das notas$/, async () => {
        await expect((browser.switchTo().alert()).accept());
        
    });



    Given(/^eu estou na página de notas da disciplina “ESS”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.name("Importar Planilha")).click();
    });

    Given(/^há notas dessa disciplina armazenadas no sistema$/, async () => {
        await request.get(base_url + `importacaodenota?turma=ESS`)
                 .then(body => {
                     expect(body == true)
                }
                ).catch(error => {throw error});
    });


    When(/^eu importo a planilha “test.csv”$/, async () => {
        var fileToUpload = '../stepdefinitions/test.csv',
        absolutePath = path.resolve(__dirname, fileToUpload);
        await element(by.css('input[type="file"]')).sendKeys(absolutePath);    
        //element(by.id('uploadButton')).click();
    });


    Then(/^uma mensagem é mostrada para o usuário perguntando se o usuário deseja sobrescrever os dados$/, async () => {
        await expect((browser.switchTo().alert()).accept);
    });



    Given(/^eu estou na página de notas da disciplina “ESS” que contém os alunos “Pedro” e “Mariana”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.name("Importar Planilha")).click();
    });


    When(/^eu importo a planilha chamada “test.csv”$/, async () => {
        var fileToUpload = '../stepdefinitions/test.csv',
        absolutePath = path.resolve(__dirname, fileToUpload);
  
        await element(by.css('input[type="file"]')).sendKeys(absolutePath);    
       
    });

    When(/^seleciono sua coluna de notas “2”$/, async () => {
        await element(by.name('colInput')).sendKeys("2")

    });

    Then(/^as notas da coluna "2" são registradas pelo sistema$/, async () => {
        await element(by.id('uploadButton')).click();
    });

    Then(/^eu recebo uma confirmação do armazenamento das notas$/, async () => {
        await expect((browser.switchTo().alert()).accept());
    });



    Given(/^eu estou na página de notas da cadeira “ESS”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.name("Importar Planilha")).click();
    });


    When(/^eu importo a planilha “testerrado.csv”$/, async () => {
        var fileToUpload = '../stepdefinitions/testerrado.csv',
        absolutePath = path.resolve(__dirname, fileToUpload);
        await element(by.css('input[type="file"]')).sendKeys(absolutePath);
    });


    Then(/^o sistema reconhece que o formato da planilha está errado$/, async () => {
        await element(by.id('uploadButton')).click();
    });

    Then(/^uma mensagem de erro é mostrada para o usuário$/, async () => {
        await expect((browser.switchTo().alert()).accept());
    });

})