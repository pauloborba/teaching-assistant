import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos'; 
import {Turmas} from './turmas'
import {Matricula} from '../common/matricula'
import { Turma } from '../common/turma'
import { Roteiro } from './roteiro';
import { BlocoDeQuestoes } from './blocodequestoes';
import { Questao } from './questao';
import { RespostaDeRoteiro } from './respostaderoteiro';
import { RespostaDeQuestao } from './respostadequestao';

var taserver = express();
// Stub para popular o front-end com alunos de uma turma
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
var stub_autoavaliacao1 = new Avaliacao();
var stub_autoavaliacao2 = new Avaliacao();
var stub_autoavaliacao3 = new Avaliacao();
var stub_autoavaliacao4 = new Avaliacao();
stub_autoavaliacao1.meta = "Requisitos";
stub_autoavaliacao1.nota = "";
stub_autoavaliacao2.meta = "Refatoração";
stub_autoavaliacao2.nota = "";
stub_autoavaliacao3.meta = "Requisitos";
stub_autoavaliacao3.nota = "MA";
stub_autoavaliacao4.meta = "Refatoração";
stub_autoavaliacao4.nota = "";
stub_matricula1.autoAvaliacoes = [stub_autoavaliacao1, stub_autoavaliacao2];
stub_matricula2.autoAvaliacoes = [stub_autoavaliacao3, stub_autoavaliacao4];
stub_turma1.matriculas = [stub_matricula1, stub_matricula2];
stub_turma2.matriculas = [stub_matricula2];
var sender = new EmailSender();


var turmas: Turmas = new Turmas();
turmas.turmas = [stub_turma1, stub_turma2];

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
const turmas: Turmas = new Turmas();

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

function stub(descricao: String) {
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
    
    
    let turma20 = new Turma("desc");
    // @ts-ignore
    turma20.descricao = descricao;
    turma20.numeroMatriculas = 2
    turma20.roteiros = [roteiro1, roteiro2]
    turma20.matriculas = [matricula1, matricula2];

    let turmas = new Turmas();
    turmas.turmas = [turma20];

    return turmas.turmas[0]
}

//recebe um identificador de turma e retorna a mesma
taserver.get('/turmas', function (req: express.Request, res: express.Response){
    let descricaoTurma: string = req.query.descricaoTurma;
    let turma: Turma = turmas.getTurma(descricaoTurma);
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
    const descricoes: string[] = req.query.turmas.split(',');
    res.send(JSON.stringify(turmas.getResumos(descricoes)));
});

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
  
function closeServer(): void {
    server.close();
}
  
export { server, closeServer }