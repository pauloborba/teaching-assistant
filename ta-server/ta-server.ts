import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos'; 
import {Turmas} from './turmas'
import {Matricula} from '../common/matricula'
import { Turma } from '../common/turma';
import { Roteiro } from './roteiro';
import { BlocoDeQuestoes } from './blocodequestoes';
import { Questao } from './questao';
import { RespostaDeRoteiro } from './respostaderoteiro';
import { RespostaDeQuestao } from './respostadequestao';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

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

//recebe um identificador de turma e retorna a mesma
taserver.get('/turmas', function (req: express.Request, res: express.Response){
    
    let descricao = req.query.descricao;

    
    let resposta1 = new RespostaDeQuestao();
    resposta1.duracao = 2;
    resposta1.correcao = 'Errado';


    let resposta2 = new RespostaDeQuestao();
    resposta2.duracao = 7;
    resposta2.correcao = 'Certo';

    let resposta3 = new RespostaDeQuestao();
    resposta3.duracao = 1;
    resposta3.correcao = 'Errado';


    let resposta4 = new RespostaDeQuestao();
    resposta4.duracao = 6;
    resposta4.correcao = 'Certo';


    let roteiro1 = new Roteiro();
    roteiro1.descricao = 'testes'

    let roteiro2 = new Roteiro();
    roteiro1.descricao = 'projeto'


    let respostasRoteiro1 = new RespostaDeRoteiro(); 
    respostasRoteiro1.respostasDeQuestoes = [resposta1, resposta2];
    respostasRoteiro1.roteiro = roteiro1;

    let respostasRoteiro2 = new RespostaDeRoteiro(); 
    respostasRoteiro2.respostasDeQuestoes = [resposta3, resposta4];
    respostasRoteiro2.roteiro = roteiro2;

    let matricula1 = new Matricula();
    // @ts-ignore
    matricula1.respostasDeRoteiros = respostasRoteiro1

    let matricula2 = new Matricula();
    // @ts-ignore
    matricula2.respostasDeRoteiros = respostasRoteiro2
    
    
    let turma20 = new Turma();
    turma20.descricao = 'ess';
    turma20.numeroMatriculas = 2
    turma20.roteiros = [roteiro1, roteiro2]
    turma20.matriculas = [matricula1, matricula2];

    let turmas = new Turmas();
    turmas.turmas = [turma20];

    // fim do stub

    let turma: Turma = turmas.getTurma(descricao)

    res.send(turma);
})

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas', function (req: express.Request, res: express.Response){

})

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
  
function closeServer(): void {
    server.close();
}
  
export { server, closeServer }