import express = require('express');
import bodyParser = require("body-parser");
import turmaRotas from "./turmas/turmas.api";

import { Aluno } from '../common/aluno';
import { CadastroDeAlunos } from './cadastrodealunos'; 
import { Turmas } from './turmas'
import { Turma } from '../common/turma'
import { Matricula } from '../common/matricula'
import { BlocoDeQuestoes } from '../common/blocodequestoes';
import { Questao } from '../common/questao';
import { RespostaDeRoteiro } from '../common/respostaderoteiro';
import { RespostaDeQuestao } from '../common/respostadequestao';
import { Avaliacao } from '../common/avaliacao';
import { EmailSender } from './EmailSender';
import {Roteiro} from '../common/roteiro'
import {CadastroDeRoteiros} from './cadastroderoteiros';
import { NotificacaoNotas } from './notificacaoNotas';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
const turmas: Turmas = new Turmas();
var sender = new EmailSender();
var cadastroRoteiro: CadastroDeRoteiros = new CadastroDeRoteiros();
var cadastroTurma: Turmas = new Turmas();
var conjTurmas: Turmas = new Turmas();
var notificacao: NotificacaoNotas = new NotificacaoNotas();

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

taserver.get('/turma/:descricao', function (req: express.Request, res: express.Response){
    let turma = turmas.getTurma(req.params.descricao)
    res.send(turma)
})

taserver.get('/metas/', function (req: express.Request, res: express.Response){
  let conjTurmas: Turmas = turmas;
  let descricaoTurma: string = <string> req.query.descricaoTurma;
  let turma: Turma = conjTurmas.getTurma(descricaoTurma);
  let metas = turma ? turma.getMetas() : [];
  res.send(metas);
    
})

taserver.post('/notificacaoResultadoFinal/', function (req: express.Request, res: express.Response) {
    var  reqTurma:Turma = <Turma> req.body;
   var turma:Turma = new Turma(reqTurma.descricao);

    if (notificacao.enviarNotificação(turma)){
        console.log("Notificou turma " + turma.descricao)
        res.send(reqTurma);
    }
    else{ 
        res.send("Faltam informações da turma!")
    }
})

taserver.use("/turmas", turmaRotas);

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas/', function (req: express.Request, res: express.Response){
    let cpf: string = <string> req.query.cpf;
    let descricaoTurma: string = <string> req.query.descricaoTurma;
    
    let turma: Turma = turmas.getTurma(descricaoTurma);
    let matricula: Matricula = turma ? turma.getMatricula(cpf) : null;
    res.send(matricula);
})

taserver.put('/autoavalicoes/atualizar/', function (req: express.Request, res: express.Response) {
  console.log('test', req.body.autoavaliacoes);
  console.log('test2', req.body.cpf);
    let autoavaliacoes: Avaliacao[] = req.body.autoavaliacoes;
    let cpf: string = req.body.cpf;
    let descricaoTurma: string = req.body.descricaoTurma;

    let turma: Turma = turmas.getTurma(descricaoTurma);
    let matricula: Matricula = turma.getMatricula(cpf);
    let atualizacao = JSON.stringify(matricula.atualizarAutoAvaliacoes(autoavaliacoes));
    let autoavaliacoesenviadas = JSON.stringify(autoavaliacoes);

    if (atualizacao === autoavaliacoesenviadas) {
      res.send({"success": "A autoavaliacao foi atualizada com sucesso"});
    } else {
      res.send({"failure": "A autoavaliacao não pode ser atualizada"});
    }
})

taserver.get('/comparacao-de-desempenho', function (req: express.Request, res: express.Response) {
    const descricoes: string[] = (<string> req.query.turmas).split(',');
    res.send(JSON.stringify(turmas.getResumos(descricoes)));
});

taserver.get('/roteiros', function (req: express.Request, res: express.Response){
  res.send(JSON.stringify(cadastroRoteiro.getRoteiros()));
})

taserver.post('/roteiro', function (req: express.Request, res: express.Response) {
  var roteiro: Roteiro = <Roteiro> req.body;
  roteiro = cadastroRoteiro.cadastrarRoteiro(roteiro);
  if (roteiro) {
    res.send({"success": "O roteiro foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O roteiro não pode ser cadastrado"});
  }
})

taserver.put('/roteiro', function (req: express.Request, res: express.Response) {
  var roteiro: Roteiro = <Roteiro> req.body;
  roteiro = cadastroRoteiro.atualizarRoteiro(roteiro);
  if (roteiro) {
    res.send({"success": "O roteiro foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O roteiro não pode ser atualizado"});
  }
})

taserver.delete('/roteiro/:descricao', function (req: express.Request, res: express.Response) {
  var descricao: string = <string> req.params.descricao;
  descricao = cadastroRoteiro.removerRoteiro(descricao);
  if (descricao) {
    res.send({"success": "O roteiro foi removido com sucesso"});
  } else {
    res.send({"failure": "O roteiro não pode ser removido"});
  }
})

taserver.post('/adicionar-turma', function (req: express.Request, res: express.Response){
    var turma: Turma = <Turma> req.body;
    turma = cadastroTurma.cadastrarTurma(turma);
    //let descricaoTurma: string = req.query.descricaoTurma;
    console.log("adicionou");
    //console.log(descricaoTurma);
    if(turma){
        res.send({"sucess": "A turma foi criada com suceso"});
    } else {
        res.send({"failure": "A turma não foi cadastrada"});
    }
})

taserver.get('adicionar-turma', function (req: express.Request, res: express.Response){
    
})

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function closeServer(): void {
server.close();
}

export { server, closeServer }