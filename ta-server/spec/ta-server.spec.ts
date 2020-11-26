import request = require("request-promise");
import { closeServer } from '../ta-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;
 
  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  it("retorna turma com base na descricao", () => {
    var turmaJson = '{"descricao":"ESS 2018.1","metas":["Requisitos","Gerência de Configuração","Testes"],"matriculas":[],"roteiros":[],"monitores":[],"numeroMatriculas":0}'


    return request.get(base_url + "turma/ESS%202018.1")
            .then(body => {
               console.log("OLHA O BODYYYYY: " + body)
               expect(body).toBe(turmaJson)
            })
            .catch(e => {
                console.log("OLHA O BODYYYYY: " + e)
               expect(e).toEqual(null)
            });
  })
})

