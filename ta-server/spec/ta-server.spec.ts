import request = require('request-promise');

const URLBase = 'http://localhost:3000/';

describe('O servidor', () => {
    let servidor: any;

    beforeAll(() => servidor = require('../ta-server'));

    afterAll(() => servidor.closeServer());

    var base_url = "http://localhost:3000/";

    it("retorna turma com base na descricao", () => {
        var turmaJson = '{"descricao":"ESS 2020.1","metas":[],"matriculas":[{"avaliacoes":[],"autoAvaliacoes":[{"meta":"testes","nota":"MPA"},{"meta":"requisitos","nota":"MANA"},{"meta":"Gerencia de Projetos","nota":"MA"}],"respostasDeRoteiros":[],"aluno":{"nome":"Carlos Eduardo","cpf":"123","email":"c@gmail"}},{"avaliacoes":[],"autoAvaliacoes":[{"meta":"testes","nota":"MPA"},{"meta":"requisitos","nota":"MANA"},{"meta":"Gerencia de Projetos","nota":""}],"respostasDeRoteiros":[],"aluno":{"nome":"Carimbo da Silva","cpf":"321","email":"cs@gmail"}},{"avaliacoes":[],"autoAvaliacoes":[{"meta":"Gerencia de Projetos","nota":""},{"meta":"Gerencia de Projetos","nota":""},{"meta":"Gerencia de Projetos","nota":""}],"respostasDeRoteiros":[],"aluno":{"nome":"Macaule Cauque","cpf":"231","email":"m@gmail"}}],"roteiros":[],"monitores":[],"numeroMatriculas":0}'
        

        return request.get(base_url + "turma/ESS%202020.1")
                .then(body => {
                   expect(body).toBe(turmaJson)
                })
                .catch(e => {
                   expect(e).toEqual(null)
                });
      })
    })
    