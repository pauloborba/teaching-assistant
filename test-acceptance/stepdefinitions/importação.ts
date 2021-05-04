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
var texto = "";
setDefaultTimeout(60 * 1000);


defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de notas da disciplina “ESS” que possui os alunos “Pedro” e “Mariana”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.name("Importar Planilha")).click();
    });


    When(/^eu importo a planilha “test.csv”$/, async () => {
        var fileToUpload = '../stepdefinitions/test.csv',
        absolutePath = path.resolve(__dirname, fileToUpload);
        await element(by.css('input[type="file"]')).sendKeys(absolutePath);    
    });


    Then(/^eu recebo confirmação do armazenamento das notas$/, async () => {
        //await browser.sleep(6000)
        await element(by.id('uploadButton')).click();
        let mel = await browser.switchTo().alert()
        let mel2 = await mel.getText();
        await expect(mel2 == "A planilha foi importada com sucesso");
        await mel.accept();
        
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


    When(/^Eu importo a planilha “test.csv”$/, async () => {
        var fileToUpload = '../stepdefinitions/test.csv',
        absolutePath = path.resolve(__dirname, fileToUpload);
        await element(by.css('input[type="file"]')).sendKeys(absolutePath);    
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
        await element(by.name('colNotaInput')).sendKeys("2")

    });

    Then(/^as notas da coluna "2" são registradas pelo sistema$/, async () => {
        await element(by.id('uploadButton')).click();
        let mel3 = await browser.switchTo().alert()
        let mel4 = await mel3.getText();
        texto = mel4;
        await mel3.accept();
    });

    Then(/^eu recebo uma confirmação do armazenamento das notas$/, async () => {
        await expect(texto == "A planilha foi importada com sucesso");
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
        let mel3 = await browser.switchTo().alert()
        let mel4 = await mel3.getText();
        await expect(mel4 == "A planilha não foi importada");
    });

})