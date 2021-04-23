import { Request, Response, Router } from 'express';
import { Avaliacao } from '../../common/avaliacao';
import { Matricula } from '../../common/matricula';
import { Turma } from '../../common/turma';
import { Turmas } from '../repos/turmas';

const autoAvaliacoesRoute = Router();
const turmas: Turmas = new Turmas();

autoAvaliacoesRoute.put('/', function (req: Request, res: Response) {
  let autoavaliacoes: Avaliacao[] = req.body.autoavaliacoes;
  let cpf: string = req.body.cpf;
  let descricaoTurma: string = req.body.descricaoTurma;

  let turma: Turma = turmas.getTurma(descricaoTurma);
  let matricula: Matricula = turma.getMatricula(cpf);
  let atualizacao = JSON.stringify(matricula.atualizarAutoAvaliacoes(autoavaliacoes));
  let autoavaliacoesenviadas = JSON.stringify(autoavaliacoes);

  if (atualizacao === autoavaliacoesenviadas) {
    res.send({ "success": "A autoavaliacao foi atualizada com sucesso" });
  } else {
    res.send({ "failure": "A autoavaliacao não pode ser atualizada" });
  }
})

export default autoAvaliacoesRoute;