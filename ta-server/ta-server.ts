import express = require('express');
import bodyParser = require("body-parser");
import { Turma } from '../common/turma'


import {CadastroDeAlunos} from './cadastrodealunos'; 
import { NotificacaoNotas } from './notificacaoNotas';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
var notificacao: NotificacaoNotas

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

})

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas', function (req: express.Request, res: express.Response){

})

taserver.post('/notificacaoResultadoFinal', function(req: express.Request, res: express.Response){
    var turma:Turma  = req.body;
    return notificacao.enviarNotificação(turma);
    
    
} )

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
  
function closeServer(): void {
    server.close();
}
  
export { server, closeServer }