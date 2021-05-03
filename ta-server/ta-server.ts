import express = require('express');
import bodyParser = require("body-parser");

import turmaRotas from "./turmas/turmas.api";
import { Turma } from '../common/turma'
import { Turmas } from './turmas'
import { NotificacaoNotas } from './notificacaoNotas';
import { Avaliacao } from './avaliacao';
import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';
import {Roteiro} from '../common/roteiro'
import {CadastroDeRoteiros} from './cadastroderoteiros';
import {Matricula} from '../common/matricula'
import { BlocoDeQuestoes } from './blocodequestoes';
import { Questao } from './questao';
import { RespostaDeRoteiro } from './respostaderoteiro';
import { RespostaDeQuestao } from './respostadequestao';
import { ImportacaoDeNotas } from './importacaodenotas';

var taserver = express();
// stub para turmas
var stub_turma1 = new Turma("");
var stub_turma2 = new Turma("");
stub_turma1.descricao = "ESS";
stub_turma2.descricao = "Compiladores";
stub_turma1.metas = ["Requisitos", "Ger. de Configuração", "Ger. de Projetos"];
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
let stub_avalicao = new Avaliacao;
stub_avalicao.setMeta("Requisitos");
stub_avalicao.setNota("");
let stub_avalicao1 = new Avaliacao;
stub_avalicao1.setMeta("Ger. de Configuração");
stub_avalicao1.setNota("");
let stub_avalicao2 = new Avaliacao;
stub_avalicao2.setMeta("Ger. de Projetos");
stub_avalicao2.setNota("");
stub_matricula1.avaliacoes = [stub_avalicao,stub_avalicao1,stub_avalicao2];
stub_matricula2.avaliacoes = [stub_avalicao,stub_avalicao1,stub_avalicao2];
stub_turma1.matriculas = [stub_matricula1, stub_matricula2];
stub_turma2.matriculas = [stub_matricula2];



var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
var notificacao: NotificacaoNotas = new NotificacaoNotas();
var importacao: ImportacaoDeNotas = new ImportacaoDeNotas();
var turmas: Turmas = new Turmas();
turmas.turmas = [stub_turma1, stub_turma2];
var cadastroTurma: Turmas = new Turmas();

var cadastroRoteiro: CadastroDeRoteiros = new CadastroDeRoteiros();


var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

taserver.use("/turmas", turmaRotas);

taserver.get('/matriculas', function (req: express.Request, res: express.Response) {
  let descricaoTurma: string = <string> req.query.turma;
let resposta = turmas.getTurma(descricaoTurma)
res.send(resposta.getMatriculas())

})

taserver.get('/metas/', function (req: express.Request, res: express.Response){
  let conjTurmas: Turmas = turmas;
  let descricaoTurma: string = <string> req.query.descricaoTurma;
  //let descricaoTurma: string = "ess";
  let turma: Turma = conjTurmas.getTurma(descricaoTurma);
  let metas = turma.getMetas();
  res.send(metas);    
})

taserver.post('/notificacaoResultadoFinal/', function (req: express.Request, res: express.Response) {
   
    var  reqTurma:Turma = <Turma> req.body;
   var turma:Turma = new Turma("");
   turma.descricao = reqTurma.descricao;
    // turma.descricao= req.body.descricao


    if (notificacao.enviarNotificação(turma)){
        console.log("Notificou turma " + turma.descricao)
        res.send(reqTurma);
    }
    else{ 
        res.send("Faltam informações da turma!")
    }
  });

taserver.get('/turmass', function (req: express.Request, res: express.Response){  
 // let turma = new Turmas();
  let desc: string[] = turmas.getDescricoes()
 // turma = turmas;
  res.send(desc);
})

taserver.get('/turma/:descricao', function (req: express.Request, res: express.Response){
    //var turmas = new Turmas();
    let turma = new Turma("");
    turma = turmas.getTurma(req.params.descricao)
    res.send(turma)
    //res.send(JSON.stringify(cadastro.getAlunos()));
})
    
//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas/', function (req: express.Request, res: express.Response){
    let cpf: string = <string> req.query.cpf;
    //let cpf: string = "111";
    let descricaoTurma: string = <string> req.query.descricaoTurma;
    //let descricaoTurma: string = "ess"

    let turma: Turma = turmas.getTurma(descricaoTurma);
    let matricula: Matricula = turma.getMatricula(cpf);
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

// taserver.get('/roteiros', function (req: express.Request, res: express.Response){
//   res.send(JSON.stringify(cadastroRoteiro.getRoteiros()));
// })

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

  taserver.get('/comparacao-de-desempenho', function (req: express.Request, res: express.Response) {
    const desc: string = <string> req.query.turmas
    const descricoes: string[] = desc.split(',')
    res.send(JSON.stringify(turmas.getResumos(descricoes)));
});

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


taserver.put('/importacaodenota', function (req: express.Request, res: express.Response) {
  let planilha = req.body;
  let avaliacoes = importacao.metaGroup(planilha);
  let turma = <string>req.query.turma;
  let ok: boolean = false;

  ok = importacao.importar(turmas.getTurma(turma), avaliacoes)
  if (ok == true) {
     res.send({"success": "A planilha foi importada com sucesso"});
  } else {
     res.send({"failure": "A planilha não foi importada"});
  }
  
});

taserver.get('/importacaodenota', function(req: express.Request, res: express.Response) {
  let tturma = turmas.getTurma(<string> req.query.turma);
  let volta = tturma.gethasNotas();
  res.send(volta)
});

function closeServer(): void {
server.close();
}
  
export { server, closeServer }