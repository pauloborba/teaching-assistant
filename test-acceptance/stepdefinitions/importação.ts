import { error } from 'console';
import { defineSupportCode} from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
let base_url = "http://localhost:3000/";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

async function getNotaBox(meta, nota) {
    let notaSelecionada: any = await element(by.id(meta.toString())).getAttribute('value') === nota.toString();
    return notaSelecionada;
};



defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de notas da disciplina “ESS”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.buttonText('Importar Planilha')).click();
    });

    Given(/^no arquivo “test.csv” temos os alunos “Pedro” com as notas “8”, “8” e “10” and “Mariana” com as notas “9”, “7” e “10”$/, async () => {
        await $("input[name='cpf']").sendKeys(<string> cpf);
        await element(by.name('descricaoTurma')).sendKeys(<string> turma);
        await element(by.name('preencher-autoavaliacao')).click();
    });

    Given(/^não há notas dessa disciplina armazenadas no sistema$/, async (meta) => {
        
    });

    When(/^eu importo a planilha “test.csv”$/, async (nota, meta) => {
       

    });

    When(/^eu importo a planilha “test.csv”$/, async () => {
        
 
    });

    Then(/^eu recebo confirmação do armazenamento das notas$/, async (nota, meta) => {
        await expect(browser.switchTo().alert());
    });



    Given(/^eu estou na página de notas da disciplina “ESS”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.buttonText('Importar Planilha')).click();
    });

    Given(/^há notas dessa disciplina armazenadas no sistema$/, async () => {
        await request.get(base_url + `/importacaodenota?turma=ESS`)
                 .then(body => {
                     expect(body == true)
                }
                ).catch(error => {throw error});
    });

    When(/^eu importo a planilha “test.csv”$/, async (nota, meta) => {
       
    });

    When(/^eu importo a planilha “test.csv”$/, async () => {
        
 
    });

    Then(/^uma mensagem é mostrada para o usuário perguntando se o usuário deseja sobrescrever os dados$/, async (nota, meta) => {
        await expect(browser.switchTo().alert());
    });




    Given(/^eu estou na página de notas da disciplina “ESS”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.buttonText('Importar Planilha')).click();
    });

    Given(/^no arquivo “test.csv” temos os alunos “Pedro” com as notas “8”, “8” e “10” and “Mariana” com as notas “9”, “7” e “10”$/, async () => {
        
    });

    Given(/^não há notas dessa disciplina armazenadas no sistema$/, async (meta) => {
        await request.get(base_url + `/importacaodenota?turma=ESS`)
        .then(body => {
            expect(body == false)
       }
       ).catch(error => {throw error});
    });

    When(/^eu importo a planilha “test.csv”$/, async (nota, meta) => {
       

    });

    When(/^seleciono sua coluna de nota “1”$/, async () => {
        
 
    });

    Then(/^as notas da coluna 1 da planilha são registradas pelo sistema$/, async (nota, meta) => {
       
    });

    Then(/^eu recebo confirmação do armazenamento das notas$/, async (nota, meta) => {
        await expect(browser.switchTo().alert());
    });



    Given(/^eu estou na página de notas da disciplina “ESS”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
        await element(by.buttonText('Importar Planilha')).click();
    });

    Given(/^no arquivo “test.csv” temos os alunos “Pedro” com as notas “8”, “8” e “10” and “Mariana” com as notas “9”, “7” e “10”$/, async () => {
        
    });

    Given(/^não há notas dessa disciplina armazenadas no sistema$/, async (meta) => {
        await request.get(base_url + `/importacaodenota?turma=ESS`)
        .then(body => {
            expect(body == false)
       }
       ).catch(error => {throw error});
    });

    When(/^eu importo a planilha “testerrado.csv”$/, async (nota, meta) => {
       

    });

    When(/^seleciono sua coluna de nota “1”$/, async () => {
        
 
    });

    Then(/^o sistema reconhece que o formato da planilha está errado$/, async (nota, meta) => {
       
    });

    Then(/^uma mensagem de erro é mostrada para o usuário$/, async (nota, meta) => {
        await expect(browser.switchTo().alert());
    });








    Given(/^o sistema não possui nenhuma nota de auto-avaliação na meta "([^\"]*)" para o aluno com CPF "(\d*)" na turma "([^\"]*)"$/, async (meta,cpf, turma) => {
        await request.get(base_url + `matriculas?cpf=${cpf.toString().toLowerCase()}&&descricaoTurma=${turma.toString().toLowerCase()}`)
                 .then(body => {
                     expect(JSON.parse(body).autoAvaliacoes.find(av => av.meta === meta.toString()).nota === '')
                }
                ).catch(error => {throw error});
                    
     });
 
     When(/^eu adiciono a nota "([^\"]*)" a meta "([^\"]*)" ao aluno com CPF "(\d*)" na turma "([^\"]*)"$/, async (nota, meta, cpf, turma) => {
        const matricula = await request.get(base_url + `matriculas?cpf=${cpf.toString().toLowerCase()}&&descricaoTurma=${turma.toString().toLowerCase()}`)
                 .then(body => {return JSON.parse(body)}).catch(error => {throw error});
        if(matricula){

            let auto = matricula.autoAvaliacoes;
            let a = auto.find(av => av.meta === meta);

            if(a){
                a.nota = nota;
                a.meta = meta;
            }
            else{
                let av = {"meta": meta, "nota" : nota};
                a = auto.push(av);
            }

            let body = {autoavaliacoes: auto, cpf: cpf.toString().toLowerCase(), descricaoTurma: turma.toString().toLowerCase()}

            var options:any = {method: 'PUT', uri: (base_url + "autoavalicoes/atualizar/"), body: body, json: true};

            await request(options)
                .then(body => 
                    expect(JSON.stringify(body)).to.equal(
                        '{"success":"A autoavaliacao foi atualizada com sucesso"}')).catch(error => {throw error});
        }  
     });
 
     Then(/^a nota "([^\"]*)" para a meta "([^\"]*)" do aluno com CPF "(\d*)" na turma "([^\"]*)" é salvo no sistema$/, async (nota, meta, cpf,turma) => {
        let matricula = await request.get(base_url + `matriculas?cpf=${cpf.toString().toLowerCase()}&&descricaoTurma=${turma.toString().toLowerCase()}`)
        .then(body => {return JSON.parse(body)}).catch(error => {throw error});
        let auto = matricula.autoAvaliacoes;
        let a = auto.find(av => av.meta === meta);
        expect(a.nota === nota.toString())
     });

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

    When(/^I select the class "([^\"]*)"$/, async (turma) => {
        await $("button[name='notificar']").click();
        await $("input[name='descricaoTurma']").sendKeys(<string> turma);
    });

    Then(/^I see a confirmation message$/, async () => {
        await $("tr[name='confirmacao']");
    });

    Then(/^I see an error message$/, async () => {
        await $("tr[name='erro']");
    });
})