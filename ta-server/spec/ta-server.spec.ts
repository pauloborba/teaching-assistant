import request = require("request-promise");
import { Turma } from "../../common/turma";
import { closeServer } from "../ta-server";


var notUrl = "http://localhost:3000/notificacaoResultadoFinal";
describe("O servidor", () => {
var server:any;
    beforeAll(() => {server = require('../ta-server')});

    afterAll(() => {server.closeServer()});
it("não envia email caso não haja informações sobre a descrição da turma",() =>{
    var turma: Turma = new Turma();
    turma.descricao="";
    var options: any = { method: 'POST', uri:notUrl, body:  turma,json:true}
    return request.post(options).then(body=>
        expect(body).toEqual("Faltam informações da turma!"))
        .catch(e=> 
            expect(e).toEqual(null))
}
);
it("envia email normalmente",() =>{
    var turma: Turma = new Turma();
    turma.descricao="32131";
    var options: any = { method: 'POST', uri:notUrl, body:  turma,json:true}
    return request.post(options).then(body=>
        expect(body).toEqual(turma))
        .catch(e=> 
            expect(e).toEqual(null))
}
);


})