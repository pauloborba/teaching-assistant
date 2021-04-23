import { Request, Response, Router } from 'express';
import { Matricula } from '../../common/matricula';
import { Turma } from '../../common/turma';
import { Turmas } from '../repos/turmas';

const turmasRoute = Router();
const turmas: Turmas = new Turmas();

turmasRoute.get('/:descricao', function (req: Request, res: Response) {
  let turma = turmas.getTurma(req.params.descricao)
  res.send(turma)
})

turmasRoute.post('/', function (req: Request, res: Response) {
  var turma: Turma = <Turma>req.body;
  turma = turmas.cadastrarTurma(turma);
  if (turma) {
    res.send({ "sucess": "A turma foi criada com suceso" });
  } else {
    res.send({ "failure": "A turma não foi cadastrada" });
  }
})

turmasRoute.get("/:id/metas", (req: Request, res: Response) => {
  const { id } = req.params
  const turma = turmas.getTurma(id);
  res.send(turma ? turma.getMetas() : [])

});

turmasRoute.get("/", (req: Request, res: Response) => {
  const descricoes = turmas.getDescricoes();
  res.send(descricoes);

});

turmasRoute.post('/:id/metas', (req: Request, res: Response) => {
  const { id } = req.params
  const { metas } = req.body;
  const turma = turmas.getTurma(id);
  turma.addMetas(metas)
  res.send(({ metas: turma.getMetas() }))
});

//recebe um identificador de turma e de aluno e retorna uma matricula
turmasRoute.get('/matriculas/', function (req: Request, res: Response) {
  let cpf: string = <string>req.query.cpf;
  let descricaoTurma: string = <string>req.query.descricaoTurma;

  let turma: Turma = turmas.getTurma(descricaoTurma);
  let matricula: Matricula = turma ? turma.getMatricula(cpf) : null;
  res.send(matricula);
})

export default turmasRoute;
