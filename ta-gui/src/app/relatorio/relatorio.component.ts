import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';

import { Roteiro } from '../../../../ta-server/roteiro';

@Component({
    selector: 'app-relatorio',
    templateUrl: './relatorio.component.html',
    styleUrls: ['./relatorio.component.css']
  })
export class RelatorioComponent implements OnInit{
  turmas: Turma[] = [];
  
  constructor() { }
  
  ngOnInit() {

  }
}