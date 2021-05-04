import { Request, Response, Router } from 'express';
import { Turma } from '../../common/turma';
import { Turmas } from '../repos/turmas';

const turmasRoute = Router();
const turmasRepo: Turmas = new Turmas();

turmasRoute.get('/', (req: Request, res: Response) => {
  res.send(turmasRepo.getTurmas());
});

turmasRoute.get('/:id', (req: Request, res: Response) => {
  const turma: Turma = turmasRepo.getTurma(req.params.id);
  res.send(turma || null);
});

turmasRoute.post('/', (req: Request, res: Response) => {
  const turma: Turma = <Turma>req.body;

  if (turmasRepo.cadastrarTurma(turma)) {
    res.send({ 'success': 'A turma foi cadastrada com sucesso' });
  } else {
    res.send({ 'failure': 'A turma não foi cadastrada' });
  }
});

turmasRoute.get('/emailsender/:descricao', (req: Request, res: Response) => {
  console.log("CHEGOU AQUI NA ROTA");
  console.log(req.params.descricao);
  const descricao: string = req.params.descricao;
  if (turmasRepo.sendAllMails(descricao)) {
    res.send({ 'success': 'Os emails foram enviados com sucesso' });
  } else {
    res.send({ 'failure': 'O envio dos emails falhou' });
  }

});

turmasRoute.put('/', (req: Request, res: Response) => {
  const turma: Turma = <Turma>req.body;

  if (turmasRepo.atualizarTurma(turma)) {
    res.send({ 'success': 'A turma foi atualizada com sucesso' });
  } else {
    res.send({ 'failure': 'A turma não foi atualizada' });
  }
});

turmasRoute.delete('/:id', (req: Request, res: Response) => {
  if (turmasRepo.removerTurma(req.params.id)) {
    res.send({ 'success': 'A turma foi removida com sucesso' });
  } else {
    res.send({ 'failure': 'A turma não foi removida' });
  }
});

export default turmasRoute;
