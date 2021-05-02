import { RelatorioDeDesempenho } from './../../common/relatorioDesempenho';
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

turmasRoute.get('/relatorio-de-desempenho/:id', (req: Request, res: Response) => {
  const relatorio: RelatorioDeDesempenho = turmasRepo.getRelatorioDeDesempenho(req.params.id);
  res.send(relatorio || null);
});

turmasRoute.post('/', (req: Request, res: Response) => {
  const turma: Turma = <Turma>req.body;

  if (turmasRepo.cadastrarTurma(turma)) {
    res.send({ 'success': 'A turma foi cadastrada com sucesso' });
  } else {
    res.send({ 'failure': 'A turma não foi cadastrada' });
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
