import { defineSupportCode} from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
let base_url = "http://localhost:3000/";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

async function getNotaBox(meta) {
    let listaNotas: ElementArrayFinder =  element.all(by.name('notaslist'));
    
    let metaSelecionada: any = await listaNotas.filter(elem => elem.getAttribute('id') === meta).first();
    let notaSelecionada: any = await metaSelecionada.element(by.id(meta));
    return notaSelecionada;


    // let notaSelecionada = metaSelecionada.element(by.id(meta)).getAttribute('value');
    // return notaSelecionada;

    // await expect(metaSelecionada.element(by.id(meta)).getAttribute('value').toMatch(nota));
};

async function getNota (meta, nota){
    let input  = await getNotaBox(meta);
    return input.getAttribute('value').toMatch(nota);
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de auto-avaliacao$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='auto-avaliacao']").click();
        await element(by.buttonText('Cadastrar')).click();
    });

    Given(/^eu busco no sistema por CPF "(\d*)" e turma "([^\"]*)"$/, async (cpf, turma) => {
        await $("input[name='cpf']").sendKeys(<string> cpf);
        await element(by.name('descricaoTurma')).sendKeys(<string> turma);
        await element(by.name('preencher-autoavaliacao')).click();
    });

    Given(/^eu vejo que não possuo nota para a meta de "([^\"]*)"$/, async (meta) => {
         await getNota(meta, '');
    });

    When(/^eu preencho nota "([^\"]*)" para a meta "([^\"]*)"$/, async (nota, meta) => {
        await getNota(meta, nota);
        let input = await getNotaBox(meta);
        await input.sendKeys(protractor.Key.ENTER);

    });

    Then(/^eu posso ver um alerta de confirmação de armazenamento dos dados$/, async () => {
        await expect(browser.switchTo().alert());
 
    });

    Then(/^eu posso ver que possuo nota "([^\"]*)" para a meta de "([^\"]*)"$/, async (nota, meta) => {
        await getNota(meta, nota);
    });



    Given(/^o sistema não possui nenhuma nota de auto-avaliação na meta "([^\"]*)" para o aluno com CPF "(\d*)" na turma "([^\"]*)"$/, async (meta,cpf, turma) => {
        await request.get(base_url + `matriculas?cpf=${cpf.toString().toLowerCase()}&&descricaoTurma=${turma.toString().toLowerCase()}`)
                 .then(body => {
                     expect(JSON.parse(body).autoAvaliacoes.find(av => av.meta === meta.toString()).nota === '')
                 }
                );
                    
     });
 
     When(/^eu adiciono a nota "([^\"]*)" a meta "([^\"]*)" ao aluno com CPF "(\d*)" na turma "([^\"]*)"$/, async (nota, meta, cpf, turma) => {
        const mat = await request.get(base_url + `matriculas?cpf=${cpf.toString().toLowerCase()}&&descricaoTurma=${turma.toString().toLowerCase()}`)
                 .then(body => {return JSON.parse(body)});
        let auto = mat.autoAvaliacoes;
        let av = {"meta": meta, "nota" : nota};
        let a = auto.find(av => av.meta === meta)
        if(a){
            a.nota = nota;
            a.meta = meta;
        }
        else{
            auto.push(av);
        }
        let body = {autoavalicoes: auto, cpf: cpf, descricaoTurma: turma}
        var options:any = {method: 'PUT', uri: (base_url + "autoavalicoes/atualizar/"), body: body, json: true};
        await request(options)
            .then(body => 
                expect(JSON.stringify(body)).to.equal(
                    '{"success":"A autoavaliacao foi atualizada com sucesso"}'));
     });
 
     Then(/^a nota "([^\"]*)" para a meta "([^\"]*)" do aluno com CPF "(\d*)" na turma "([^\"]*)" é salvo no sistema$/, async (nota, meta, cpf,turma) => {
        await request.get(base_url + `matriculas?cpf=${cpf.toString().toLowerCase()}&&descricaoTurma=${turma.toString().toLowerCase()}`)
        .then(body => {return JSON.parse(body)});
        let resposta = `{"meta":"${meta}","nota": ${nota}`;
        await request.get(base_url + "alunos")
                      .then(body => expect(body.autoAvaliacoes.includes(resposta)).to.equal(true));
     });
 
})