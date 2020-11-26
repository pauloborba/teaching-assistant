import express = require('express');
import bodyParser = require("body-parser");

/*import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';
import {Turmas} from './turmas'
import {Matricula} from '../common/matricula'*/
import {Roteiro} from '../common/roteiro'
import {CadastroDeRoteiros} from './cadastroderoteiros';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
var cadastroRoteiro: CadastroDeRoteiros = new CadastroDeRoteiros();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

/*taserver.get('/alunos', function (req: express.Request, res: express.Response) {

})

//recebe um identificador de turma e retorna a mesma
taserver.get('/turmas', function (req: express.Request, res: express.Response){

})

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas', function (req: express.Request, res: express.Response){

})*/

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

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function closeServer(): void {
    server.close();
}

export { server, closeServer }
