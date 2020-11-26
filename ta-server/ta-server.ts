import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos'; 
import {Turmas} from './turmas'
import {Turma} from '../common/turma'
import {Matricula} from '../common/matricula'

var taserver = express();

// stub para turmas
var stub_turma1 = new Turma();
var stub_turma2 = new Turma();
stub_turma1.descricao = "ESS";
stub_turma2.descricao = "Compiladores";
stub_turma1.metas = ["Requisitos", "Refatoração"];
stub_turma2.metas = ["Meta1", "Meta2"]
var stub_matricula1 = new Matricula();
var stub_matricula2 = new Matricula();
var stub_aluno1 = new Aluno();
var stub_aluno2 = new Aluno();
stub_aluno1.nome = "João";
stub_aluno1.cpf = "123";
stub_aluno1.email = "joao@cin.ufpe.br";
stub_aluno2.nome = "Maria";
stub_aluno2.cpf = "456";
stub_aluno2.email = "maria@cin.ufpe.br";
stub_matricula1.aluno = stub_aluno1;
stub_matricula2.aluno = stub_aluno2;
stub_turma1.matriculas = [stub_matricula1, stub_matricula2];
stub_turma2.matriculas = [stub_matricula2];



var turmas: Turmas = new Turmas();
turmas.turmas = [stub_turma1, stub_turma2];

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

taserver.get('/alunos', function (req: express.Request, res: express.Response) {

})

//recebe um identificador de turma e retorna a mesma
taserver.get('/turmas', function (req: express.Request, res: express.Response){

})

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas', function (req: express.Request, res: express.Response){

})

taserver.post('/adicionar-turma', function (req: express.Request, res: express.Response){
    let descricaoTurma: string = req.query.descricaoTurma;
    let turma: Turma = turmas.getTurma(descricaoTurma);
    let teste = turma.descricao;
    console.log("adicionar-turma");
    console.log(descricaoTurma);
    res.send({"teste": {teste}});

})

taserver.put('/editar-turma', function (req: express.Request, res: express.Response){
    let descricaoTurma: string = req.query.descricaoTurma;
    console.log("editar-turma");
    console.log(descricaoTurma);
    res.send(descricaoTurma);

})

  
function closeServer(): void {
    server.close();
}

  
export { server, closeServer }