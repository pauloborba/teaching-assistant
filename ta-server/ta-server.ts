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
import { Avaliacao } from './avaliacao';
import { EmailSender } from './EmailSender';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
const turmas: Turmas = new Turmas();
var sender = new EmailSender();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  aluno = cadastro.cadastrar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

taserver.delete('/aluno', function(req: express.Request, res: express.Response){
  let aluno: string = req.query.id.toString();
  var removido = cadastro.remover(aluno);
  if (removido) {
    res.send({"success": "O aluno foi removido com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser removido"});
  }
})

//recebe um identificador de turma e retorna a mesma
taserver.get('/turmas', function (req: express.Request, res: express.Response){
    let descricao: string = <string> req.query.descricao;
    let turma: Turma = turmas.getTurma(descricao);
    res.send(turma);
})

//recebe um endereço de email e envia a notificação para fazer a auto-avaliação
taserver.post('/notificar', function (req: express.Request, res: express.Response){
    let objectNotification = req.body;
    let notificationSent: boolean;
    for (var i = 0; i < objectNotification.length; i++) {
        let to: string = objectNotification[i].email;
        let meta: string = objectNotification[i].meta;
        let from: string = "professor@cin.ufpe.br";
        let subject: string = "Notificação de auto-avaliação";
        let message: string = "Seu professor está requisitando que você realize sua auto-avaliação da meta " + meta;
        notificationSent = sender.enviarEmail(from, to, subject, message);
        if (notificationSent === false) {
            break;
        }
    }
    if (notificationSent === true) {
        res.send({"success": "Notificações foram enviadas"})
    } else {
        res.send({"failure": "Notificações não foram enviadas"})
    }
})

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas', function (req: express.Request, res: express.Response){

})

taserver.get('/comparacao-de-desempenho', function (req: express.Request, res: express.Response) {
    const descricoes: string[] = (<string> req.query.turmas).split(',');
    res.send(JSON.stringify(turmas.getResumos(descricoes)));
});

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
  
function closeServer(): void {
    server.close();
}
  
export { server, closeServer }