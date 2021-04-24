import { Request, Response, Router } from 'express';
import { Roteiro } from '../../common/roteiro';
import { Roteiros } from '../repos/roteiros';

const roteirosRoute = Router();
const roteirosRepo: Roteiros = new Roteiros();

roteirosRoute.get('/', (req: Request, res: Response) => {
  res.send(roteirosRepo.getRoteiros());
});

roteirosRoute.get('/:id', (req: Request, res: Response) => {
  const roteiro: Roteiro = roteirosRepo.getRoteiro(req.params.id);
  res.send(roteiro || null);
});

roteirosRoute.post('/', (req: Request, res: Response) => {
  const roteiro: Roteiro = <Roteiro>req.body;

  if (roteirosRepo.cadastrarRoteiro(roteiro)) {
    res.send({ 'success': 'O roteiro foi cadastrado com sucesso' });
  } else {
    res.send({ 'failure': 'O roteiro não foi cadastrado' });
  }
});

roteirosRoute.put('/', (req: Request, res: Response) => {
  const roteiro: Roteiro = <Roteiro>req.body;

  if (roteirosRepo.atualizarRoteiro(roteiro)) {
    res.send({ 'success': 'O roteiro foi atualizado com sucesso' });
  } else {
    res.send({ 'failure': 'O roteiro não foi atualizado' });
  }
});

roteirosRoute.delete('/:id', (req: Request, res: Response) => {
  if (roteirosRepo.removerRoteiro(req.params.id)) {
    res.send({ 'success': 'O roteiro foi removido com sucesso' });
  } else {
    res.send({ 'failure': 'O roteiro não foi removido' });
  }
});

export default roteirosRoute;
