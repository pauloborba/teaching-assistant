import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by} from 'protractor';

import request = require("request-promise");


let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var path = require('path');

async function removerAlunos(){
    const list = await element.all(by.name("deletar-aluno"));
    if(!!list.length){
       for(const p of list){
           await p.click();
       }
    }
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function checkEmailExists(list: ElementArrayFinder, email: string){
    const result = list.filter(async (elem) => {
        return (await elem.getText()) == email;
    });

    return result.length != 0;
}

async function checkAllEmailsExists(list, emails){
    for(const email in emails){
        if(!checkEmailExists(list, email)){
            return false;
        }
    }
    return true;
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

    Given(/^apenas os alunos "(.*)" e "(.*)" de emails "(.*)" e "(.*)" estão presentes na lista de alunos cadastrados$/, async (nome1, nome2, em1, em2) => {
        await removerAlunos();
        // Criar Lucas
        await criarAluno(nome1, em1);
        // Criar Alyson
        await criarAluno(nome2, em2);
        var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await expect(checkEmailExists(allAlunos, <string> em1));
        await checkEmailExists(allAlunos, <string> em2);
    });

    When(/^eu vou para a página de importar alunos$/, async () => {
        await browser.get("http://localhost:4200/importacao");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    });


    When(/^eu seleciono a planilha de nome "(.*)"$/, async (planilha) =>{
        var arquivo = `../planilhas/${planilha}`;
        var caminho = path.resolve(__dirname, arquivo);
        await element(by.name('csv')).sendKeys(caminho);
    });
    
    Then(/^aparece um aviso avisando que "(\d*)" dos alunos já estavam cadastrados$/, async (numero) => {
        await browser.sleep(1000);
        let alert = await browser.switchTo().alert();
        let texto = await alert.getText();
        await expect(texto == `Dos alunos da planilha, já haviam ${numero} cadastrados.`);
        await alert.accept();
    });
    
    Then(/^eu vejo "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" e "(.*)" nos emails da lista de alunos$/, async (em1, em2, em3, em4, em5, em6) => {
        await browser.get("http://localhost:4200/alunos");
        var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
        var allEmails : string[] = [<string> em1, <string> em2, <string> em3, <string> em4, <string> em5, <string> em6];
        expect(checkAllEmailsExists(allAlunos, allEmails));
    });

    Given(/^não existem alunos cadastrados na lista de alunos$/, async () => {
        await removerAlunos();
        var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await assertTamanhoEqual(allAlunos,0);
    });

    When(/^eu seleciono uma planilha vazia de nome "(.*)"$/, async (planilha) =>{
        var arquivo = `../planilhas/${planilha}`;
        var caminho = path.resolve(__dirname, arquivo);
        await element(by.name('csv')).sendKeys(caminho);
    });

    Then(/^aparece uma mensagem de erro escrito "(.*)"$/, async (msg) => {
        await browser.sleep(1000);
        let alert = await browser.switchTo().alert();
        let texto = await alert.getText();
        await expect(texto == `${msg}`);
        await alert.accept();
    });

    Then(/^ainda não existem alunos cadastrados na lista de alunos$/, async () => {
        var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await assertTamanhoEqual(allAlunos,0);
    });

    Then(/^os alunos de email "(.*)" e "(.*)" aparecem na lista de alunos$/, async (em1, em2) => {
        await browser.get("http://localhost:4200/alunos");
        var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
        var allEmails : string[] = [<string> em1, <string> em2];
        expect(await checkAllEmailsExists(allAlunos, allEmails));
    });

    Given(/^na página de alunos, apenas a aluna de email "(.*)" está cadastrada$/, async (em) => {
        await browser.get("http://localhost:4200/alunos");
        await removerAlunos();
        await criarAluno('julia', 'julia@cin.ufpe.br');
        var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await assertTamanhoEqual(allAlunos, 1);
        await expect(checkEmailExists(allAlunos, <string> em));
    });
    
    When(/^eu seleciono o arquivo de uma planilha de nome "(.*)" que não tem os dados do email na coluna de logins$/, async (planilha) => {
        var arquivo = `../planilhas/${planilha}`;
        var caminho = path.resolve(__dirname, arquivo);
        await element(by.name('csv')).sendKeys(caminho);
    });

    Then(/^apenas a aluna de email "(.*)" está cadastrada$/, async (em) => {
        await browser.get("http://localhost:4200/alunos");
        await removerAlunos();
        await criarAluno("julia", <string> em);
        var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
        expect(await checkEmailExists(allAlunos, <string>em));
    });

    Given(/^na página de alunos, a aluna de email "(.*)" continua sendo a única cadastrada$/, async (em) => {
        await browser.get("http://localhost:4200/alunos");
        var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await assertTamanhoEqual(allAlunos, 1);
        expect(await checkEmailExists(allAlunos, <string>em));
    });

    
});