import express = require('express');
import bodyParser = require('body-parser');
import { CronJob } from 'cron';

import { NotificacaoNotas } from './notificacaoNotas';

import alunosRoute from './routes/alunos';
import turmasRoute from './routes/turmas';
import autoAvaliacoesRoute from './routes/autoAvaliacoes';
import roteirosRoute from './routes/roteiros';
import relatoriosRoute from './routes/relatorios';
import notificacoesRoute from './routes/notificacoes';

const taServer = express();
const notificacaoNotas = new NotificacaoNotas();

function allowCrossDomain(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

taServer.use(allowCrossDomain);
taServer.use(bodyParser.json());

taServer.use('/alunos', alunosRoute);
taServer.use('/turmas', turmasRoute);
taServer.use('/auto-avaliacoes', autoAvaliacoesRoute);
taServer.use('/roteiros', roteirosRoute);
taServer.use('/relatorios', relatoriosRoute);
taServer.use('/notificacoes', notificacoesRoute);

const server = taServer.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const enviarAtualizacoes = new CronJob('0 18 * * *', () => {
  console.info((new Date()).toLocaleString('pt-BR'), 'Enviando atualizações de notas');
  notificacaoNotas.enviarAtualizacoes();
}, null, true, 'America/Sao_Paulo');

const enviarAtualizacoesPendentes = new CronJob('0 0-17,19-23 * * *', () => {
  console.info((new Date()).toLocaleString('pt-BR'), 'Enviando atualizações de notas pendentes');
  notificacaoNotas.enviarAtualizacoesPendentes();
}, null, true, 'America/Sao_Paulo');

function closeServer(): void {
  enviarAtualizacoes.stop();
  enviarAtualizacoesPendentes.stop();
  server.close();
}

export { server, closeServer };
