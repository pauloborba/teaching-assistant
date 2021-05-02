import request = require("request-promise");
import { Aluno } from "../../common/aluno";
import { closeServer } from "../ta-server";
var base_url = "http://localhost:3000/";

describe("Importa vários alunos através de uma planilha", () => {
    var server: any;
    beforeAll(() => { server = require('../ta-server') });
    afterAll(() => { server.closeServer() });

    it("envia email e retorna alunos que foram notificados", () => {
        var aluno1 = new Aluno();
        var aluno2 = new Aluno();
        aluno1.nome = "João";
        aluno1.cpf = "123";
        aluno1.email = "joao@cin.ufpe.br";
        aluno2.nome = "Maria";
        aluno2.cpf = "456";
        aluno2.email = "maria@cin.ufpe.br";
        const alunos = [aluno1, aluno2];
        const correctResponse = [{ nome: 'João', email: 'joao@cin.ufpe.br', cpf: '123', metas: {}}, { nome: 'Maria', email: 'maria@cin.ufpe.br', cpf: '456', metas: {}}]
        var options: any = { method: 'POST', uri: (base_url + 'alunos'), body: alunos, json: true }
        return request.post(options)
            .then(body => { return expect(body.success).toEqual(correctResponse) })
            .catch(e => expect(e).toEqual(null));
    });
});