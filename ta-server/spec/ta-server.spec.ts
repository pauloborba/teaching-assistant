import request = require("request-promise");
import { closeServer } from '../ta-server';

var base_url = "http://localhost:3000/";
let descricaoTurma = 'ESS';


describe("O servidor", () => {
    var server:any;
    
    beforeAll(() => {server = require('../ta-server')});
    
    afterAll(() => {server.closeServer()});
    
    it("retorna uma lista de metas de uma turma", () => {

    let res = '["gerencia de configuração","refatorar código com qualidade","entender requisitos","especificar requisitos","elicitar requisitos"]';

    return request.get(base_url + `metas?descricaoTurma=${descricaoTurma.toString().toLowerCase()}`)
            .then(body => {

               expect(body).toContain(res)
            }
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
    })


})
