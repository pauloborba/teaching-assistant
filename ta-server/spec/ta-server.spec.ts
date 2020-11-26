import request = require("request-promise");
import { closeServer } from '../ta-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  it("cadastro de roteiros", () => {
    var options:any = {method: 'POST', uri: (base_url + "roteiro"), body:{descricao:"Roteiro de testes", blocos:[]}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

  it("não cadastra roteiros com mesmo nome", () => {
    var roteiro1 = {"json":{"descricao":"Roteiro de requisitos","blocos":[{"tipo":"Sequencial","questoes":[]}]}};
    var roteiro2 = {"json":{"descricao":"Roteiro de requisitos","blocos":[{"tipo":"Paralelo","questoes":[]}]}};
    var resposta1 = '{"descricao":"Roteiro de requisitos","blocos":[{"tipo":"Sequencial","questoes":[]}]}';
    var resposta2 = '{"descricao":"Roteiro de requisitos","blocos":[{"tipo":"Paralelo","questoes":[]}]}';

    return request.post(base_url + "roteiro", roteiro1)
             .then(body => {
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});
                return request.post(base_url + "roteiro", roteiro2)
                         .then(body => {
                            expect(body).toEqual({failure: "O roteiro não pode ser cadastrado"});
                            return request.get(base_url + "roteiros")
                                     .then(body => {
                                        expect(body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                      });
                          });
              })
              .catch(err => {
                 expect(err).toEqual(null)
              });
 })

})
