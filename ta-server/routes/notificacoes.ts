import { Request, Response, Router } from 'express';
import { AtualizacaoNotas } from '../../common/atualizacaoNotas';
import { AtualizacoesNotas } from '../repos/atualizacoesNotas';
import { Turma } from '../../common/turma';
import { EmailSender } from '../emailSender';
import { NotificacaoNotas } from '../notificacaoNotas';

const notificacoesRoute = Router();
const atualizacoesNotasRepo: AtualizacoesNotas = new AtualizacoesNotas();
const sender = new EmailSender();
const notificacao: NotificacaoNotas = new NotificacaoNotas();

notificacoesRoute.get('/atualizacoes-notas', (req: Request, res: Response) => {
  res.send(atualizacoesNotasRepo.getAtualizacoesNotas());
});

notificacoesRoute.post('/atualizacoes-notas', (req: Request, res: Response) => {
  const atualizacaoNotas: AtualizacaoNotas = <AtualizacaoNotas>req.body;

  if (atualizacoesNotasRepo.cadastrarAtualizacaoNotas(atualizacaoNotas)) {
    res.send({ 'success': 'A atualização foi cadastrada com sucesso' });
  } else {
    res.send({ 'failure': 'A atualização não foi cadastrada' });
  }
});

//recebe um endereço de email e envia a notificação para fazer a auto-avaliação
notificacoesRoute.post('/auto-avaliacao', function (req: Request, res: Response){
    let objectNotification = req.body;
    let notificationSent: boolean;
    for (var i = 0; i < objectNotification.length; i++) {
        let to: string = objectNotification[i].email;
        let meta: string = objectNotification[i].meta;
        let from: string = "professor@cin.ufpe.br";
        let subject: string = "Notificação de auto-avaliação";
        let message: string = "Seu professor está requisitando que você realize sua auto-avaliação da meta " + meta;
        notificationSent = sender.enviarEmail(to, subject, message, from);
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

notificacoesRoute.post('/resultado-final/', function (req: Request, res: Response) {
    var  reqTurma:Turma = <Turma> req.body;
    var turma:Turma = new Turma();
    turma.descricao = reqTurma.descricao;

    if (notificacao.enviarNotificacao(turma)){
        console.log("Notificou turma " + turma.descricao)
        res.send(reqTurma);
    }
    else{ 
        res.send("Faltam informações da turma!")
    }
})

export default notificacoesRoute;
