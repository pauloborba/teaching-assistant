import { Request, Response, Router } from 'express';
import { Roteiro } from '../../common/roteiro';
import { CadastroDeRoteiros } from '../repos/cadastroderoteiros';

const roteirosRoute = Router();
const roteirosRepo: CadastroDeRoteiros = new CadastroDeRoteiros();

roteirosRoute.get('/', function (req: Request, res: Response) {
  res.send(JSON.stringify(roteirosRepo.getRoteiros()));
})

roteirosRoute.post('/', function (req: Request, res: Response) {
  var roteiro: Roteiro = <Roteiro>req.body;
  roteiro = roteirosRepo.cadastrarRoteiro(roteiro);
  if (roteiro) {
    res.send({ "success": "O roteiro foi cadastrado com sucesso" });
  } else {
    res.send({ "failure": "O roteiro não pode ser cadastrado" });
  }
})

roteirosRoute.put('/', function (req: Request, res: Response) {
  var roteiro: Roteiro = <Roteiro>req.body;
  roteiro = roteirosRepo.atualizarRoteiro(roteiro);
  if (roteiro) {
    res.send({ "success": "O roteiro foi atualizado com sucesso" });
  } else {
    res.send({ "failure": "O roteiro não pode ser atualizado" });
  }
})

roteirosRoute.delete('/:descricao', function (req: Request, res: Response) {
  var descricao: string = <string>req.params.descricao;
  descricao = roteirosRepo.removerRoteiro(descricao);
  if (descricao) {
    res.send({ "success": "O roteiro foi removido com sucesso" });
  } else {
    res.send({ "failure": "O roteiro não pode ser removido" });
  }
})

export default roteirosRoute;
