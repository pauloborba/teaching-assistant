import { Request, Response, Router } from 'express';
import express = require('express');
import { AgendamentoRoteiro } from '../../common/agendamentoDeRoteiro';
import {VerificaPrazo} from '../repos/verificaPrazoRepo';


const verificaPrazoRoute = Router();
const verificaPrazoRepo: VerificaPrazo = new VerificaPrazo();

verificaPrazoRoute.post('/comparaDataEnvio', function (req: express.Request, res: express.Response) {
    var dateLimitObject : AgendamentoRoteiro = <AgendamentoRoteiro > req.body; 
    
    if (verificaPrazoRepo.compareDates(dateLimitObject)) {
      res.send({"success": "seu roteiro foi enviado com sucesso"});
    } else {
      res.send({"failure": "Infelizmente você perdeu o prazo para submissão do roteiro"});
    }
  });
export default verificaPrazoRoute;