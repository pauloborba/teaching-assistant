import { Request, Response, Router } from 'express';
import { Turmas } from '../turmas';

const turmaRotas = Router();

const turmas = new Turmas();

turmaRotas.get("/:id/metas", (req: Request, res: Response) => {
    const {id} = req.params
    res.send(id)
});

export default turmaRotas;