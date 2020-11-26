import express = require('express');
import bodyParser = require("body-parser");
import { Turma } from '../common/turma'
import { Turmas } from './turmas'


import { CadastroDeAlunos } from './cadastrodealunos';
import { NotificacaoNotas } from './notificacaoNotas';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
var notificacao: NotificacaoNotas = new NotificacaoNotas();
var turmas: Turmas = new Turmas();

var allowCrossDomain = function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
})

taserver.get('/turmas', function (req: express.Request, res: express.Response) {

})

taserver.get('/matriculas', function (req: express.Request, res: express.Response) {

})
taserver.post('/notificacaoResultadoFinal/:descricao', function (req: express.Request, res: express.Response) {
   
   var turma:Turma = new Turma();
   turma.descricao = req.params.descricao;
    // turma.descricao= req.body.descricao


    if (notificacao.enviarNotificação(turma))
        console.log("Notificou turma " + turma.descricao)
        res.send(turma);



})

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function closeServer(): void {
    server.close();
}

export { server, closeServer }