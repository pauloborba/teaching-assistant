import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';

import { Observable } from 'rxjs';
import { RelatorioService } from './relatorio.service';

@Component({
    selector: 'app-relatorio',
    templateUrl: './relatorio.component.html',
    styleUrls: ['./relatorio.component.css'],
    providers: [RelatorioService]
  })
export class RelatorioComponent implements OnInit{

  turma: Turma
  
  constructor() {
   }
  
  ngOnInit() {
    this.turma.descricao = "Turma 2020.3"
  }

}