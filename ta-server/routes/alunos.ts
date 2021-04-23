import { Request, Response, Router } from 'express';
import { Aluno } from '../../common/aluno';
import { CadastroDeAlunos } from '../repos/cadastrodealunos';

const alunosRoute = Router();
const alunosRepo: CadastroDeAlunos = new CadastroDeAlunos();

alunosRoute.get('/', function (req: Request, res: Response) {
  res.send(JSON.stringify(alunosRepo.getAlunos()));
})

alunosRoute.post('/', function (req: Request, res: Response) {
  var aluno: Aluno = <Aluno>req.body; //verificar se é mesmo Aluno!
  aluno = alunosRepo.cadastrar(aluno);
  if (aluno) {
    res.send({ "success": "O aluno foi cadastrado com sucesso" });
  } else {
    res.send({ "failure": "O aluno não pode ser cadastrado" });
  }
})

alunosRoute.put('/', function (req: Request, res: Response) {
  var aluno: Aluno = <Aluno>req.body;
  aluno = alunosRepo.atualizar(aluno);
  if (aluno) {
    res.send({ "success": "O aluno foi atualizado com sucesso" });
  } else {
    res.send({ "failure": "O aluno não pode ser atualizado" });
  }
})

alunosRoute.delete('/', function (req: Request, res: Response) {
  let aluno: string = req.query.id.toString();
  var removido = alunosRepo.remover(aluno);
  if (removido) {
    res.send({ "success": "O aluno foi removido com sucesso" });
  } else {
    res.send({ "failure": "O aluno não pode ser removido" });
  }
})

export default alunosRoute;
