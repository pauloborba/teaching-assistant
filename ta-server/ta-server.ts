import express = require('express');
import bodyParser = require("body-parser");

import { Aluno } from '../common/aluno';
import { CadastroDeAlunos } from './cadastrodealunos'; 
import { Turmas } from './turmas'
import { Turma } from '../common/turma'
import { Matricula } from '../common/matricula'
import { Avaliacao } from './avaliacao';
import { RespostaDeRoteiro } from './respostaderoteiro';


var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
var conjTurmas: Turmas = new Turmas();

//stub
let aluno = new Aluno();
aluno.nome = 'eulalia';
aluno.cpf = '123';
aluno.email = 'eulalia@';

let aluno2 = new Aluno();
aluno.nome = 'eunice';
aluno2.cpf = '456';
aluno2.email = 'eunice@';

let autoavaliacao1 = new Avaliacao();
autoavaliacao1.meta = 'entender requisitos';
autoavaliacao1.nota = 'MANA';

let autoavaliacao2 = new Avaliacao();
autoavaliacao2.meta = 'gerencia de configuração';
autoavaliacao2.nota = 'MPA';

let autoavaliacao3 = new Avaliacao();
autoavaliacao3.meta = 'refatorar código com qualidade';
autoavaliacao3.nota = '7';

let avaliacao1 = new Avaliacao();
avaliacao1.meta = 'entender requisitos';
avaliacao1.nota = 'MA';

let avaliacao2 = new Avaliacao();
avaliacao2.meta = 'gerencia de configuração';
avaliacao2.nota = 'MA';

let avaliacao3 = new Avaliacao();
avaliacao3.meta = 'refatorar código com qualidade';
avaliacao3.nota = '10';

let respostasDeRoteiros1 = new RespostaDeRoteiro();

let matricula1 = new Matricula();
matricula1.aluno = aluno;
matricula1.autoAvaliacoes = [autoavaliacao1,autoavaliacao2, autoavaliacao3];
matricula1.avaliacoes = [avaliacao1,avaliacao2, avaliacao3];
matricula1.respostasDeRoteiros = [respostasDeRoteiros1];

let matricula2 = new Matricula();
matricula2.aluno = aluno2;
matricula2.autoAvaliacoes = [autoavaliacao1,autoavaliacao2];
matricula2.avaliacoes = [avaliacao1,avaliacao2];
matricula2.respostasDeRoteiros = [respostasDeRoteiros1];

let turma1 = new Turma();
turma1.matriculas = [matricula1];
turma1.descricao = 'ess';
turma1.metas = ['gerencia de configuração', 'refatorar código com qualidade', 'entender requisitos', 'especificar requisitos', 'elicitar requisitos'];

let turma2 = new Turma();
turma2.matriculas = [matricula1,matricula2];
turma2.descricao = 'compiladores';
turma2.metas = ['entender requisitos', 'especificar requisitos', 'elicitar requisitos'];

let turmas = new Turmas();
turmas.turmas = [turma1, turma2];
//fim do stub



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


// taserver.get('/turmas/', function (req: express.Request, res: express.Response){
//   let conjTurmas: Turmas = turmas;
//   let descricaoTurma: string = req.query.descricaoTurma;
//   let turma: Turma = conjTurmas.getTurma(descricaoTurma);
//   res.send(turma);
    
// })

taserver.get('/metas/', function (req: express.Request, res: express.Response){
  let conjTurmas: Turmas = turmas;
  let descricaoTurma: string = req.query.descricaoTurma;
  let turma: Turma = conjTurmas.getTurma(descricaoTurma);
  let metas = turma.getMetas();
  res.send(metas);
    
})

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas/', function (req: express.Request, res: express.Response){
    let cpf: string = req.query.cpf;
    let descricaoTurma: string = req.query.descricaoTurma;
    
    let turma: Turma = turmas.getTurma(descricaoTurma);
    let matricula: Matricula = turma.getMatricula(cpf);
    res.send(matricula);
})

taserver.put('/autoavalicoes/atualizar/', function (req: express.Request, res: express.Response) {
    let autoavaliacoes: Avaliacao[] = req.body.autoavaliacoes;
    let cpf: string = req.body.cpf;
    let descricaoTurma: string = req.body.descricaoTurma;

    let turma: Turma = turmas.getTurma(descricaoTurma);
    let matricula: Matricula = turma.getMatricula(cpf);
    let atualizacao = JSON.stringify(matricula.atualizarAutoAvaliacoes(autoavaliacoes));
    let autoavaliacoesenviadas = JSON.stringify(autoavaliacoes);

    if (atualizacao === autoavaliacoesenviadas) {
      console.log('é igual');
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