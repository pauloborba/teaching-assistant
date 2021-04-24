import { Request, Response, Router } from 'express';
import { Aluno } from '../../common/aluno';
import { Alunos } from '../repos/alunos';

const alunosRoute = Router();
const alunosRepo: Alunos = new Alunos();

alunosRoute.get('/', (req: Request, res: Response) => {
  res.send(alunosRepo.getAlunos());
});

alunosRoute.get('/:id', (req: Request, res: Response) => {
  const aluno: Aluno = alunosRepo.getAluno(req.params.id);
  res.send(aluno || null);
});

alunosRoute.post('/', (req: Request, res: Response) => {
  const aluno: Aluno = <Aluno>req.body;

  if (alunosRepo.cadastrarAluno(aluno)) {
    res.send({ 'success': 'O aluno foi cadastrado com sucesso' });
  } else {
    res.send({ 'failure': 'O aluno não foi cadastrado' });
  }
});

alunosRoute.put('/', (req: Request, res: Response) => {
  const aluno: Aluno = <Aluno>req.body;

  if (alunosRepo.atualizarAluno(aluno)) {
    res.send({ 'success': 'O aluno foi atualizado com sucesso' });
  } else {
    res.send({ 'failure': 'O aluno não foi atualizado' });
  }
});

alunosRoute.delete('/:id', (req: Request, res: Response) => {
  if (alunosRepo.removerAluno(req.params.id)) {
    res.send({ 'success': 'O aluno foi removido com sucesso' });
  } else {
    res.send({ 'failure': 'O aluno não foi removido' });
  }
});

export default alunosRoute;
