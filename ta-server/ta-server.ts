import express = require('express');
import bodyParser = require('body-parser');

import alunosRoute from './routes/alunos';
import turmasRoute from './routes/turmas';
import autoAvaliacoesRoute from './routes/autoAvaliacoes';
import roteirosRoute from './routes/roteiros';
import relatoriosRoute from './routes/relatorios';
import notificacoesRoute from './routes/notificacoes';
import matriculasRoute from './routes/matriculas';

const taServer = express();

function allowCrossDomain(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

taServer.use(allowCrossDomain);
taServer.use(bodyParser.json());

taServer.use('/alunos', alunosRoute);
taServer.use('/matriculas', matriculasRoute);
taServer.use('/turmas', turmasRoute);
taServer.use('/auto-avaliacoes', autoAvaliacoesRoute);
taServer.use('/roteiros', roteirosRoute);
taServer.use('/relatorios', relatoriosRoute);
taServer.use('/notificacoes', notificacoesRoute);

const server = taServer.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function closeServer(): void {
  server.close();
}

export { server, closeServer };
