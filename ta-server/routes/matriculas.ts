import { Request, Response, Router } from 'express';
import { Aluno } from '../../common/aluno';
import { Avaliacao } from '../../common/avaliacao';
import { Matricula } from '../../common/matricula';
import { Matriculas } from '../repos/matriculas';

const matriculasRoute = Router();
const matriculasRepo: Matriculas = new Matriculas();

const alunosStub = [
  {
    nome: 'Adriana Vitória Ferreira',
    cpf: '815.098.557-34',
    email: 'adrianavitoriaferreira_@uel.br',
  },
  {
    nome: 'Tiago Julio Silva',
    cpf: '249.897.251-07',
    email: 'tiagojuliosilva-79@tec3.com.br',
  }
];

const avaliacao1: Avaliacao = {
  meta: "Gerência de Req.",
  nota: "MA",
  copyFrom: null
}
const avaliacao2: Avaliacao = {
  meta: "Gerência de Proj.",
  nota: "MA",
  copyFrom: null
}
const avaliacao3: Avaliacao = {
  meta: "Testes.",
  nota: "MA",
  copyFrom: null
}
const avaliacao4: Avaliacao = {
  meta: "Refatoração",
  nota: "MA",
  copyFrom: null
}
​
alunosStub.forEach((aluno) => {
  const alunoTemp = new Aluno();
  alunoTemp.nome = aluno.nome;
  alunoTemp.email = aluno.email;
  alunoTemp.cpf = aluno.cpf
  const matricula = new Matricula();
  matricula.aluno = alunoTemp;
  matricula.avaliacoes.push(avaliacao1, avaliacao2, avaliacao3,avaliacao4);
  matriculasRepo.cadastrarMatricula(matricula);
})

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

matriculasRoute.put('/nota', (req: Request, res: Response) => {
  const matricula: Matricula = <Matricula>req.body.matricula;
  const avaliacao: Avaliacao = <Avaliacao>req.body.avaliacao;

  if (matriculasRepo.atualizarNota(matricula, avaliacao)) {
    res.send({ 'success': 'A Nota foi atualizada com sucesso' });
  } else {
    res.send({ 'failure': 'A Nota não foi atualizada' });
  }
});

matriculasRoute.delete('/removerNota/:id/:meta', (req: Request, res: Response) => {
  if (matriculasRepo.removerNota(req.params.id, req.params.meta)) {
    res.send({ 'success': 'A Nota foi removida com sucesso' });
  } else {
    res.send({ 'failure': 'A Nota não foi removida' });
  }
});

export default matriculasRoute;