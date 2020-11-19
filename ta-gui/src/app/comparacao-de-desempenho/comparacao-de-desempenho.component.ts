import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-comparacao-de-desempenho',
  templateUrl: './comparacao-de-desempenho.component.html',
  styleUrls: ['./comparacao-de-desempenho.component.css']
})
export class ComparacaoDeDesempenhoComponent implements AfterViewInit {
  @ViewChildren('grafico') graficos: QueryList<any>;
  turmas: any[] = [];
  
  constructor() { }
  
  ngAfterViewInit(): void {
    const canvasMedia = this.graficos.find(c => c.nativeElement.id === 'media').nativeElement;
    this.criarGrafico(canvasMedia, 'Média', this.turmas.map(turma => turma.media));
    
    const canvasReprovacao = this.graficos.find(c => c.nativeElement.id === 'reprovacao').nativeElement;
    this.criarGrafico(canvasReprovacao, 'Reprovação', this.turmas.map(turma => turma.reprovacao));
  }

  criarGrafico(canvas: any, nome: string, dados: number[]): Chart {
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.turmas.map(turma => turma.descricao),
        datasets: [
          {
            label: nome,
            data: dados
          }
        ]
      }
    })
  }
}
