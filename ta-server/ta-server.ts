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
    
    let questao1 = new Questao();
    let questao2 = new Questao();
    
    let resposta1 = new RespostaDeQuestao();
    resposta1.questao = questao1;
    resposta1.duracao = 2;
    resposta1.correcao = 'Errado';


    let resposta2 = new RespostaDeQuestao();
    resposta2.questao = questao2;
    resposta2.duracao = 7;
    resposta2.correcao = 'Certo';

    let respostasRoteiro1 = new RespostaDeRoteiro(); 
    respostasRoteiro1.respostasDeQuestoes = [resposta1, resposta2];
    
    let blocoDeQuestoes1 = new BlocoDeQuestoes(); 
    blocoDeQuestoes1.questoes = [questao1, questao2];
    
    let roteiro1 = new Roteiro();
    roteiro1.blocos = []
    
    let turma20 = new Turma();
    turma20.descricao = 'ess';

    let turmas = [turma20];

    // fim do stub
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