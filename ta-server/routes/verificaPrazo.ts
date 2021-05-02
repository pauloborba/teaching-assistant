import { Request, Response, Router } from 'express';
import express = require('express');
import { DateLimit } from '../../common/agendamentoDeRoteiro';
import {VerificaPrazo} from '../repos/verificaPrazo';


const verificaPrazoRoute = Router();
const verificaPrazoRepo: VerificaPrazo = new VerificaPrazo();

verificaPrazoRoute.post('/comparedatelimit', function (req: express.Request, res: express.Response) {
    var dateLimitObject : DateLimit = < DateLimit > req.body; 
    var resultadoCompare = verificaPrazoRepo.compareDates(dateLimitObject);
    if (resultadoCompare) {
      res.send({"success": "o Roteiro está dentro do prazo"});
    } else {
      res.send({"failure": "o Roteiro está fora do prazo"});
    }
  });
export default verificaPrazoRoute;