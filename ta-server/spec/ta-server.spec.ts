import request = require("request-promise");
import { closeServer } from '../ta-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
    var server:any;
    beforeAll(() => {server = require('../ta-server')});
    afterAll(() => {server.closeServer()});
  
    it("envia emails para os alunos", () => {
        var options:any = {method: 'POST', uri: (base_url + "notificar"), body:[{email: 'joao@cin.ufpe.br', meta: ['Requisitos', 'Refatoração']}], json: true};
        return request(options)
            .then(body => 
                expect(body).toEqual({success: 'Notificações foram enviadas'})
            )
            .catch(e => 
                expect(e).toEqual(null)
            );
    })
})