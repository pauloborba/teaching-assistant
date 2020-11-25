import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ElementFinder } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameMeta = ((elem, meta) => elem.element(by.name('meta')).getText().then(text => text === meta));
let sameNota = ((elem, nota) => elem.element(by.name('meta')).getText().then(text => text === nota));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^I am at the self-evaluation page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='auto-avaliacao']").click();
        await element(by.buttonText('Discrepantes')).click();

    });

    Given(/^the class "([^\"]*)" with the goals "([^\"]*)", "([^\"]*)" e "([^\"]*)" is stored in the system$/, async (par1,par2,par3,par4) => {
    
    });
   
    Given(/^the student "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and self-evaluations enrolled on the "([^\"]*)" class is stored in the system$/, async (par1, par2,par3,par4) => {
    
    });

    Given(/^the student "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and no self-evaluation enrolled on the "([^\"]*)" class is stored in the system$/, async (par1, par2,par3,par4) => {
    
    });

    Given(/^the student "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and "([^\"]*)" in all his self-evaluations enrolled on the "([^\"]*)" class is stored in the system$/, async (par1, par2,par3,par4,par5) => {
    
    });

 
    When(/^I request to see the outliers self-evaluations of the class "([^\"]*)"$/, async (descricao) => {
        await $("input[name='turmabox']").sendKeys(<string> descricao);
        await element(by.buttonText('OK')).click();
    });


    Then(/^I can see the 3 goals "([^\"]*)", "([^\"]*)" e "([^\"]*)"$/, async ( meta1, meta2, meta3) => {

        var metas = element.all(by.name('meta'))

        await metas.filter(async elem => await elem.getText()==meta1).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await metas.filter(async elem => await elem.getText()==meta2).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await metas.filter(async elem => await elem.getText()==meta3).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
        

    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and self-evaluations$/, async (name, cpf, nota) => {
        //Checando estudante com esse nome e cpf
        var matriculas = element.all(by.name('matricula'));
        
        matriculas.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(
            async elems => {
                expect(Promise.resolve(elems.length)).to.eventually.equal(1);
                var matricula = await elems[0]
                var avaliacoes = await matricula.element.all(by.name('avaliacao'))
                avaliacoes.filter( async elem => {(await elem.getText())=="Avaliação: " + nota}).then(av => expect(Promise.resolve(av.length)).to.eventually.equal(3)); 
                var autoavaliacoes = await matricula.element.all(by.name('auto-avaliacao'))
                autoavaliacoes.filter( async elem => {(await elem.getText())=="Autoavaliação: " + nota}).then(av => expect(Promise.resolve(av.length)).to.eventually.equal(3)); 

            })
       
    });

    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and "([^\"]*)" in all his self-evaluations$/, async (name, cpf, avaliacao, autoavaliacao) => {
        //Checando estudante com esse nome e cpf
        // var matriculas : ElementArrayFinder = element.all(by.name('matricula'));
        // var matricula = await matriculas.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then
        //            (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));

        // //Checando avaliacao
        // var avaliacoes = await matricula.all(by.name('avaliacao'))
        // await avaliacoes.filter(elem => sameNota(elem,"Avaliação: " + avaliacao)).then
        // (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(avaliacoes.length));

        // //Checando autoavaliacao
        // var autoavaliacoes = await matricula.all(by.name('avaliacao'))
        // await autoavaliacoes.filter(elem => sameNota(elem,"Autoavaliação: " + autoavaliacao)).then
        // (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(autoavaliacoes.length));

        var matriculas = element.all(by.name('matricula'));
        
        matriculas.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(
            async elems => {
                expect(Promise.resolve(elems.length)).to.eventually.equal(1);
                var matricula = await elems[0]
                var avaliacoes = await matricula.element.all(by.name('avaliacao'))
                avaliacoes.filter( async elem => {(await elem.getText())=="Avaliação: " + avaliacao}).then(av => expect(Promise.resolve(av.length)).to.eventually.equal(3)); 
                var autoavaliacoes = await matricula.element.all(by.name('auto-avaliacao'))
                autoavaliacoes.filter( async elem => {(await elem.getText())=="Autoavaliação: " + autoavaliacao}).then(av => expect(Promise.resolve(av.length)).to.eventually.equal(3)); 

            })
    });


    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and no self-evaluation$/, async (name, cpf, avaliacao) => {
        //Checando estudante com esse nome e cpf
        // var matriculas : ElementArrayFinder = element.all(by.name('matricula'));
        // var matricula = await matriculas.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then
        //            (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));

        // //Checando avaliacao
        // var avaliacoes = await matricula.all(by.name('avaliacao'))
       

        // await avaliacoes.filter(elem => sameNota(elem,"Avaliação: " + avaliacao)).then
        // (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(avaliacoes.length));

        // //Checando autoavaliacao
        // var autoavaliacoes = await matricula.all(by.name('avaliacao'))
        // await autoavaliacoes.filter(elem => sameNota(elem,"Autoavaliação: ")).then
        // (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(autoavaliacoes.length));

        var matriculas = element.all(by.name('matricula'));
        
        matriculas.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(
            async elems => {
                expect(Promise.resolve(elems.length)).to.eventually.equal(1);
                var matricula = await elems[0]
                var avaliacoes = await matricula.element.all(by.name('avaliacao'))
                avaliacoes.filter( async elem => {(await elem.getText())=="Avaliação: " + avaliacao}).then(av => expect(Promise.resolve(av.length)).to.eventually.equal(3)); 
                var autoavaliacoes = await matricula.element.all(by.name('auto-avaliacao'))
                autoavaliacoes.filter( async elem => {(await elem.getText())=="Autoavaliação: "}).then(av => expect(Promise.resolve(av.length)).to.eventually.equal(3)); 

            })
    });

    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" marked with "([^\"]*)"$/, async (name, cpf, color) => {
        //Checando estudante com esse nome e cpf
        var matriculas = element.all(by.name('matricula'));
        
        matriculas.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(
            async elems => {
                expect(Promise.resolve(elems.length)).to.eventually.equal(1)
                if(color=="red"){
                    elems[0].element.getCssValue('background-color').toEqual('rgba(240, 41, 41, 0.87)')
                }else if (color=="orange"){
                    elems[0].getCssValue('background-color').toEqual('(247, 177, 47)')


                }

            })
    });

    Then(/^I see that there is "(\d*)" outliers and that there is "([^\"]*)" of outliers$/, async (numberDiscrepante, porcentagemDiscrepantes) => {

    });

    // When(/^I try to remove "([^\"]*)" with CPF "(\d*)" from the students list$/, async (name, cpf) => {
    //     var allStudents = element.all(by.name("alunolist"));
    //     var student = allStudents.filter(elem => pAND(sameCPF(elem, cpf), sameName(elem, name)));
    //     var webElements = await student.getWebElements();
    //     var removeButton = await webElements[0].findElement(by.tagName('button'));
    //     await removeButton.click();
    
    // });

    // Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
    //     var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
    //     var samecpfs = allcpfs.filter(elem =>
    //                                   elem.getText().then(text => text === cpf));
    //     await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    // });

    // Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
    //     var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
    //     await allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then
    //                (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    // });

})

