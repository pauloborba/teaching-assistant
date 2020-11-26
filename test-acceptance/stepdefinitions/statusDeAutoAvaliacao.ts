import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameStatus = ((elem, status) => elem.element(by.name('statusList')).getText().then(text => text === status));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function getTurma(descricao) {
    await $("input[name='turmabox']").sendKeys(<string> descricao);
    await element(by.id('carregarMatricula')).click();
}

async function assertElementsWithSameStatusAndName(n,status,name) { 
    var allalunos : ElementArrayFinder = element.all(by.name('alunoList'));
    var samecpfsandname = allalunos.filter(elem => pAND(sameStatus(elem,status),sameName(elem,name)));
    await assertTamanhoEqual(samecpfsandname,n);
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}


const verificarTamanho = (array, tamanho) => expect(Promise.resolve(array.length)).to.eventually.equal(tamanho);

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='alunos']").click();
    })

    When(/^I try to get a class with id "(.*)"$/, async (turma) => {
        await getTurma(turma);
    });

    Then(/^I can see a class with id "(.*)"$/, async (id) =>{
        var turma = element.all(by.name('descricaoTurma'))
        await turma.filter(async elem => await elem.getText()==id).then
                   (elems => {return expect(Promise.resolve(elems.length)).to.eventually.equal(1)}).catch(e =>
                    expect(e).equal(null)
                  );
    });
    
    Then(/^I can see "(.*)" with status "(.*)" in the students list$/, async (nome, status) => {
        var turma = element.all(by.name('alunoList'))
        
        await turma.filter(async elem => pAND(sameStatus(elem, status), sameName(elem, nome))).then
                   (elems => {return expect(Promise.resolve(elems.length)).to.eventually.equal(1)}).catch(e =>
                    expect(e).equal(null)
                  );
    });


    // Then(/^I cannot see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
    //     await assertElementsWithSameCPFAndName(0,cpf,name);
    // });

    // Then(/^I can see an error message$/, async () => {
    //     var allmsgs : ElementArrayFinder = element.all(by.name('msgcpfexistente'));
    //     await assertTamanhoEqual(allmsgs,1);
    // });

    // Given(/^the system has no student with CPF "(\d*)"$/, async (cpf) => {
    //    await request.get(base_url + "alunos")
    //             .then(body => 
    //                expect(body.includes(`"cpf":"${cpf}"`)).to.equal(false));
    // });

    

    // Then(/^the system now stores "([^\"]*)" with CPF "(\d*)"$/, async (name, cpf) => {
    //     let resposta = `{"nome":"${name}","cpf":"${cpf}","email":"","metas":{}`;
    //     await request.get(base_url + "alunos")
    //                  .then(body => expect(body.includes(resposta)).to.equal(true));
    // });

})