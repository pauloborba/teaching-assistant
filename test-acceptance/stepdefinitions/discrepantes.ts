import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ElementFinder } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf).catch(e =>
    expect(e).toEqual(null)
  ));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name).catch(e =>
    expect(e).toEqual(null)
  ));


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
        await new Promise( resolve => setTimeout(resolve, 100) );

        await $("input[name='turmabox']").sendKeys(<string> descricao);
        await element(by.buttonText('OK')).click();
    });


    Then(/^I can see the 3 goals "([^\"]*)", "([^\"]*)" e "([^\"]*)"$/, async ( meta1, meta2, meta3) => {

        var metas = element.all(by.name('meta'))

        await metas.filter(async elem => await elem.getText()==meta1).then
                   (elems => {return expect(Promise.resolve(elems.length)).to.eventually.equal(1)}).catch(e =>
                    expect(e).equal(null)
                  );
        await metas.filter(async elem => await elem.getText()==meta2).then
                   (elems => {return expect(Promise.resolve(elems.length)).to.eventually.equal(1)}).catch(e =>
                    expect(e).equal(null)
                  );
        await metas.filter(async elem => await elem.getText()==meta3).then
                   (elems => { return expect(Promise.resolve(elems.length)).to.eventually.equal(1)}).catch(e =>
                    expect(e).equal(null)
                  );
    });
        

    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and self-evaluations$/, async (name, cpf, nota) => {
       
        var matriculas = element.all(by.name('matricula'));
        matriculas.filter(elem => pAND(sameCPF(elem, cpf), sameName(elem, name))).then(async (elems) => {
            expect(Promise.resolve(elems.length)).to.eventually.equal(1);
            var matricula = await elems[0];
            var avaliacoes = matricula.all(by.name('avaliacao'));
            avaliacoes.filter(async (elem) => { return (await elem.getText()) == "Avaliação: " + nota; }).then(av => {
                return expect(Promise.resolve(av.length)).to.eventually.equal(3);
            });
            var autoavaliacoes = matricula.all(by.name('auto-avaliacao'));
            autoavaliacoes.filter(async (elem) => { return (await elem.getText()) == "Autoavaliação: " + nota; }).then(av => { return expect(Promise.resolve(av.length)).to.eventually.equal(3); }).catch(e => expect(e).equal(null));
        }).catch(e => expect(e).equal(null));
    
        
    });

    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and "([^\"]*)" in all his self-evaluations$/, async (name, cpf, avaliacao, autoavaliacao) => {
     
        var matriculas = element.all(by.name('matricula'));
        matriculas.filter(elem => pAND(sameCPF(elem, cpf), sameName(elem, name))).then(async (elems) => {
            expect(Promise.resolve(elems.length)).to.eventually.equal(1);
            var matricula = await elems[0];
            var avaliacoes = matricula.all(by.name('avaliacao'));
            avaliacoes.filter(async (elem) => { return (await elem.getText()) == "Avaliação: " + avaliacao; }).then(av => { return expect(Promise.resolve(av.length)).to.eventually.equal(3); }).catch(e => expect(e).equal(null));
            var autoavaliacoes = matricula.all(by.name('auto-avaliacao'));
            autoavaliacoes.filter(async (elem) => { return (await elem.getText()) == "Autoavaliação: " + autoavaliacao; }).then(av => { return expect(Promise.resolve(av.length)).to.eventually.equal(3); }).catch(e => expect(e).equal(null));
        }).catch(e => expect(e).equal(null));
      
    });

   
    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" with "([^\"]*)" in all his evaluations and no self-evaluation$/, async (name, cpf, avaliacao) => {

        var matriculas = element.all(by.name('matricula'));
        matriculas.filter(elem => pAND(sameCPF(elem, cpf), sameName(elem, name))).then(async (elems) => {
            expect(Promise.resolve(elems.length)).to.eventually.equal(1);
            var matricula = await elems[0];
            var avaliacoes = matricula.all(by.name('avaliacao'));
            avaliacoes.filter(async (elem) => { return (await elem.getText()) == "Avaliação: " + avaliacao; }).then(av => { return expect(Promise.resolve(av.length)).to.eventually.equal(3); });
            var autoavaliacoes = matricula.all(by.name('auto-avaliacao'));
            autoavaliacoes.filter(async (elem) => { return (await elem.getText()) == "Autoavaliação:"; }).then(av => { return expect(Promise.resolve(av.length)).to.eventually.equal(3); });
        });
    });




    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" marked with "([^\"]*)"$/, async (name, cpf, color) => {

        await new Promise( resolve => setTimeout(resolve, 100) );
        
            var matriculas = element.all(by.name('matricula'));
            matriculas.filter(elem => pAND(sameCPF(elem, cpf), sameName(elem, name))).then(async (elems) => {
                expect(Promise.resolve(elems.length)).to.eventually.equal(1);
                const corDaLinha = await elems[0].getCssValue('background-color');
                if (color == "red") {
                    expect(corDaLinha).to.equal('rgb(240, 41, 41)');
                }
                else if (color == "orange") {
                    expect(corDaLinha).to.equal('rgb(247, 177, 47)');
                }
            });
        
    
        
    });

    Then(/^I see that there is "(\d*)" outliers and that there is "([^\"]*)" of outliers$/, async (numberDiscrepante, porcentagemDiscrepantes) => {
        await new Promise( resolve => setTimeout(resolve, 100) );

        const numDiscrepantes = await element(by.name("totalDiscrepantes")).getText()
        expect(numberDiscrepante).equal(numberDiscrepante)

        const porcentDiscrepantes = await element(by.name("porcentagemDiscrepantes")).getText()
        expect(porcentDiscrepantes).equal(porcentagemDiscrepantes)

    });
})

