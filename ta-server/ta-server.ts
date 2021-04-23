import express = require('express');
import bodyParser = require("body-parser");

import alunosRoute from './routes/alunos';
import turmasRoute from './routes/turmas';
import autoAvaliacoesRoute from './routes/autoAvaliacoes';
import roteirosRoute from './routes/roteiros';
import relatoriosRoute from './routes/relatorios';
import notificacoesRoute from './routes/notificacoes';

var taserver = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.use('/alunos', alunosRoute);
taserver.use('/turmas', turmasRoute);
taserver.use('/auto-avaliacoes', autoAvaliacoesRoute);
taserver.use('/roteiros', roteirosRoute);
taserver.use('/relatorios', relatoriosRoute);
taserver.use('/notificacoes', notificacoesRoute);

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function closeServer(): void {
server.close();
}

export { server, closeServer }