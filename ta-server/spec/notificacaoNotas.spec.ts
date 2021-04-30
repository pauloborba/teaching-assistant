import request = require("request-promise");
import { Aluno } from "../../common/aluno";
import { Matricula } from "../../common/matricula";
import { Turma } from "../../common/turma";
import { closeServer } from "../ta-server";
var base_url = "http://localhost:3000/";

describe("Envia notificação de notas", () => {
    var server: any;
    beforeAll(() => { server = require('../ta-server') });
    afterAll(() => { server.closeServer() });

    it("envia email e retorna alunos que foram notificados", () => {
        var turma = new Turma("");
        var matricula1 = new Matricula();
        var matricula2 = new Matricula();
        var aluno1 = new Aluno();
        var aluno2 = new Aluno();
        aluno1.nome = "João";
        aluno1.cpf = "123";
        aluno1.email = "joao@cin.ufpe.br";
        aluno2.nome = "Maria";
        aluno2.cpf = "456";
        aluno2.email = "maria@cin.ufpe.br";
        matricula1.aluno = aluno1;
        matricula2.aluno = aluno2;
        turma.descricao = "ESS-2020.1";
        turma.matriculas = [matricula1, matricula2];
        turma.statusNotificacao = [{ nome: 'João', cpf: '123', notificado: false }, { nome: 'Maria', cpf: '456', notificado: false }]

        const correctResponse = [{ nome: 'João', cpf: '123', notificado: true }, { nome: 'Maria', cpf: '456', notificado: true }]
        var options: any = { method: 'POST', uri: (base_url + 'notificacaoResultadoFinal'), body: turma, json: true }
        return request.post(options)
            .then(body => { console.log(body); return expect(body).toEqual(correctResponse) })
            .catch(e => expect(e).toEqual(null))  
    });
});