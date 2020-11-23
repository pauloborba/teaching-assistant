import { Request, response, Response, Router } from 'express';
import { Turma } from '../../common/turma';
import { Turmas } from '../turmas';

const turmaRotas = Router();

const turmas: Turmas = new Turmas();

turmaRotas.get("/:id/metas", (req: Request, res: Response) => {
    const {id} = req.params
    const turma = turmas.getTurma(id);
    res.send(turma.getMetas())
});

turmaRotas.get("/", (req: Request, res: Response) =>{
    const descricoes = turmas.getDescricoes();
    res.send({descricoes});
    
});

export default turmaRotas;