import express = require('express');
import bodyParser = require("body-parser");

import { Aluno } from '../common/aluno';
import { CadastroDeAlunos } from './cadastrodealunos'; 
import { Turmas } from './turmas'
import { Turma } from '../common/turma'
import { Matricula } from '../common/matricula'
import { Avaliacao } from './avaliacao';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
var conjTurmas: Turmas = new Turmas();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {

})


taserver.get('/turmas', function (req: express.Request, res: express.Response){
    
})

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas', function (req: express.Request, res: express.Response){
    let cpf = req.query.cpf;
    let descricaoTurma = req.query.descricaoTurma;
    let turma: Turma = conjTurmas.getTurma(descricaoTurma);
    let matricula: Matricula = turma.getMatricula(cpf);

    res.send(matricula);
})

taserver.put('/autoavalicoes/atualizar', function (req: express.Request, res: express.Response) {
    var autoavalicoes: Avaliacao[] = <Avaliacao[]> req.body.autoavalicoes;
    var matricula: Matricula = <Matricula> req.body.matricula;
    autoavalicoes = cadastro.atualizar(autoavalicoes, matricula);
    if (autoavalicoes) {
      res.send({"success": "A autoavaliacao foi atualizada com sucesso"});
    } else {
      res.send({"failure": "A autoavaliacao não pode ser atualizada"});
    }
})

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
  
function closeServer(): void {
server.close();
}

export { server, closeServer }