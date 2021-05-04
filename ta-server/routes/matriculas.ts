import { Request, Response, Router } from 'express';
import { Matricula } from '../../common/matricula';
import { Matriculas } from '../repos/matriculas';

const matriculasRoute = Router();
const matriculasRepo: Matriculas = new Matriculas();

matriculasRoute.get('/', (req: Request, res: Response) => {
  res.send(matriculasRepo.getMatriculas());
});

matriculasRoute.get('/:id', (req: Request, res: Response) => {
  const matricula: Matricula = matriculasRepo.getMatricula(req.params.id);
  res.send(matricula || null);
});

matriculasRoute.post('/', (req: Request, res: Response) => {
  const matricula: Matricula = <Matricula>req.body;

  if (matriculasRepo.cadastrarMatricula(matricula)) {
    res.send({ 'success': 'A Matricula foi cadastrada com sucesso' });
  } else {
    res.send({ 'failure': 'A Matricula não foi cadastrada' });
  }
});

matriculasRoute.put('/', (req: Request, res: Response) => {
  const matricula: Matricula = <Matricula>req.body;

  if (matriculasRepo.atualizarMatricula(matricula)) {
    res.send({ 'success': 'A Matricula foi atualizada com sucesso' });
  } else {
    res.send({ 'failure': 'A Matricula não foi atualizada' });
  }
});

matriculasRoute.delete('/:id', (req: Request, res: Response) => {
  if (matriculasRepo.removerMatricula(req.params.id)) {
    res.send({ 'success': 'A Matricula foi removida com sucesso' });
  } else {
    res.send({ 'failure': 'A Matricula não foi removida' });
  }
});

export default matriculasRoute;