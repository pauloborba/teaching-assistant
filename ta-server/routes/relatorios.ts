import { Request, Response, Router } from 'express';
import { Turmas } from '../repos/turmas';

const relatoriosRoute = Router();
const turmas: Turmas = new Turmas();

relatoriosRoute.get('/comparacao-de-desempenho', function (req: Request, res: Response) {
    const descricoes: string[] = (<string> req.query.turmas).split(',');
    res.send(JSON.stringify(turmas.getResumos(descricoes)));
});

export default relatoriosRoute;