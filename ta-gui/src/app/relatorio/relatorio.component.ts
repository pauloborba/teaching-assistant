import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';

import { Observable } from 'rxjs';
import { RelatorioService } from './relatorio.service';
import { Roteiro } from '../../../../ta-server/roteiro';
import { BlocoDeQuestoes } from '../../../../ta-server/blocodequestoes';
import { Matricula } from '../../../../common/matricula';

@Component({
    selector: 'app-relatorio',
    templateUrl: './relatorio.component.html',
    styleUrls: ['./relatorio.component.css'],
    providers: [RelatorioService]
  })
export class RelatorioComponent implements OnInit{

  media: Number;
  desvio: Number;
  corr: Number;
  
  constructor(private service: RelatorioService) {
   }
  
  ngOnInit() {
    
    // @ts-ignore
    this.turma = this.service.getTurma(descricao);
  }

  getMedia(turma, roteiro): Number {
    return 0
  }

  getDesvio(turma, roteiro): Number {
    return 0
  }

  getCorr(turma, roteiro): Number {
    return 0
  }

}